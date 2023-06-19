import requests
import re

# Set the repository owner and name
owner = "owner"
repo = "repo"
# Set the date in the format 'YYYY-MM-DD'
start_date = "2023-06-07"
end_date = "2023-06-12"
# Set your personal access token
token = "github access token"
# Set the regex pattern to filter filenames
pattern = r".*"


# Compile the regex pattern
regex = re.compile(pattern)
# Construct the API URL
url = f"https://api.github.com/repos/{owner}/{repo}/commits?since={start_date}T00:00:00Z&until={end_date}T23:59:59Z"

print("Fetching...")

# Send a GET request to the GitHub API with authentication
response = requests.get(url, headers={"Authorization": f"Token {token}"})

# Check if the request was successful
if response.status_code == 200:
    commits = response.json()
    # Create a list to store the commit details
    commit_details = []

    # Iterate over the pages of commits
    while True:
        # Extract the commit details from the current page
        for commit in commits:
            commit_url = commit["url"]
            commit_response = requests.get(
                commit_url, headers={"Authorization": f"Token {token}"}
            )
            if commit_response.status_code == 200:
                commit_data = commit_response.json()
                # Extract the commit details
                commit_sha = commit_data["sha"]
                commit_html_url = commit_data["html_url"]
                commit_author = commit_data["commit"]["author"]["name"]
                commit_date = commit_data["commit"]["author"]["date"]
                commit_files = commit_data["files"]
                # Iterate over the modified files in the commit
                for file in commit_files:
                    filename = file["filename"]
                    if regex.match(filename):
                        file_details = {
                            "filename": file["filename"],
                            "author": commit_author,
                            "date": commit_date,
                            "html_url": commit_html_url,
                        }
                        commit_details.append(file_details)
                        print(file["filename"])
            else:
                print(f"An error occured {commit_response.status_code}")

        # Append the commit details to the text file
        with open("modified_files.txt", "a") as file:
            for commit in commit_details:
                file.write(f"Filename: {commit['filename']}\n")
                file.write(f"Author: {commit['author']}\n")
                file.write(f"Date: {commit['date']}\n")
                file.write(f"URL: {commit['html_url']}\n")
                file.write("\n")
        commit_details = []
        print("Commit details appended to modified_files.txt")

        # Check if there are more pages
        link_header = response.headers.get("Link")
        if link_header and 'rel="next"' in link_header:
            # Extract the URL for the next page
            next_page_url = link_header.split(";")[0].strip("<>")
            # Send a GET request to the next page
            response = requests.get(
                next_page_url, headers={"Authorization": f"Token {token}"}
            )
            print("Fetching next page...")
            # Check if the request was successful
            if response.status_code == 200:
                commits = response.json()
            else:
                print(
                    f"Failed to retrieve next page. Status code: {response.status_code}"
                )
                break
        else:
            break

else:
    print(f"Failed to retrieve commits. Status code: {response.status_code}")
