<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
<img src="https://github.com/alexandrelam/blame-detective/assets/25727549/79fa934c-66a9-4f62-a277-01a02fc2bd44" alt="Logo" height="35">

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/alexandrelam/blame-detective">
    <img src="public/detective.png" alt="Logo" width="120" height="120">
  </a>

<h3 align="center">B<i>lame</i> Detective</h3>

  <p align="center">
    Empowering Developers to Track and Expose Code Alterations! 🕵️
    <br />
    <a href="https://github.com/alexandrelam/blame-detective"><strong>Explore the docs </strong></a>
    <br />
    <br />
    <a href="https://github.com/alexandrelam/blame-detective/issues">Report Bug</a>
    ·
    <a href="https://github.com/alexandrelam/blame-detective/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[cover.webm](https://github.com/alexandrelam/blame-detective/assets/25727549/10a217db-7ca7-4b51-8f2c-58bc18c80f1d)

Blame Detective is a highly efficient and user-friendly application designed to streamline the process of bug tracking and debugging in software development projects. By leveraging its powerful features, Blame Detective empowers developers to identify and resolve bugs quickly and effectively, saving valuable time and resources.

Blame Detective aims to revolutionize the bug tracking process by providing developers with a comprehensive set of tools to expedite bug resolution. By pinpointing the exact file responsible for the bug, developers can significantly reduce debugging time and enhance overall productivity.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![React][React.js]][React-url]
- [![Vite](https://img.shields.io/badge/Vite-2.6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
- [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-2.2.19-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
- [![DaisyUI](https://img.shields.io/badge/DaisyUI-1.11.0-FB8C00?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://daisyui.com/)
- [![GitHub API](https://img.shields.io/badge/GitHub%20API-v3-181717?style=for-the-badge&logo=github&logoColor=white)](https://docs.github.com/en/rest)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Thank you for choosing Blame Detective for your bug tracking and debugging needs. Follow the instructions below to set up and use the application.

### Prerequisites

Before installing Blame Detective, ensure that you have the following prerequisites:

Node.js and npm (Node Package Manager) installed on your machine. You can download them from https://nodejs.org.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

To install and run Blame Detective locally, please follow these steps:

1. Clone the GitHub repository to your local machine using the following command:

   ```sh
   git clone https://github.com/alexandrelam/blame-detective.git
   ```

   Alternatively, you can download the repository as a ZIP file and extract it to your preferred location.

2. Navigate to the project directory:

   ```sh
   cd blame-detective
   ```

3. Install the required npm packages by running the following command:

   ```sh
   npm ci
   ```

4. Run the application using the following command:

   ```sh
   npm run dev
   ```

5. Open your web browser and access the application at http://localhost:5173/.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Blame Detective offers a range of powerful features to streamline the bug tracking and debugging process. Here are some examples of how you can effectively use the application:

### Example 1: Tracking Bug Introduction by Analyzing Modified Files within a Date Range

Specify the desired date range within Blame Detective to focus on specific periods of time.

Blame Detective will analyze the modification timestamps of your project files and display a comprehensive list of files that were modified within the specified range.

Review the list of modified files to identify potential candidates responsible for introducing bugs during that timeframe.

### Example 2: Conducting Advanced Text Searches

Utilize the powerful text search functionality provided by Blame Detective to locate specific code snippets or lines related to a bug.

Enter relevant search terms or apply regular expressions to narrow down your search to specific lines, functions, or variables.

Blame Detective will display the files that contain the matching text, allowing you to focus your attention on those specific code sections for bug investigation and resolution.

### Example 3: Including and Excluding Files with Regular Expressions

Leverage the flexibility of regular expressions within Blame Detective to include or exclude specific files from analysis.

Craft custom regular expressions to precisely target the files that need to be analyzed, saving time and effort.

Refine your bug tracking efforts by excluding irrelevant files or narrowing down the search to a specific subset of files based on their names or paths.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [ ] CI / CD

See the [open issues](https://github.com/alexandrelam/blame-detective/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Project Link: [https://github.com/alexandrelam/blame-detective](https://github.com/alexandrelam/blame-detective)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [me](https://github.com/alexandrelam/blame-detective)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/alexandrelam/blame-detective.svg?style=for-the-badge
[contributors-url]: https://github.com/alexandrelam/blame-detective/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/alexandrelam/blame-detective.svg?style=for-the-badge
[forks-url]: https://github.com/alexandrelam/blame-detective/network/members
[stars-shield]: https://img.shields.io/github/stars/alexandrelam/blame-detective.svg?style=for-the-badge
[stars-url]: https://github.com/alexandrelam/blame-detective/stargazers
[issues-shield]: https://img.shields.io/github/issues/alexandrelam/blame-detective.svg?style=for-the-badge
[issues-url]: https://github.com/alexandrelam/blame-detective/issues
[license-shield]: https://img.shields.io/github/license/alexandrelam/blame-detective.svg?style=for-the-badge
[license-url]: https://github.com/alexandrelam/blame-detective/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/alexandre-lam-74787b191/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
