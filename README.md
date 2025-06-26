# QuizKnit

Backend for QuizKnit, a web application that generates quizzes based on user provided text. It can be used as an educational tool to quickly create comprehension quizzes or as a fun way to test knowledge from any content you input. You can view a working demo at https://quizknit.com/

## Technologies Used

- **Backend**: Node.js, Express
- **Quiz Generation API**: OpenAI

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.16.1 or higher)

### Installation

1. **Clone the repository**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. Create a .env file using the .sample.env file in the repo as a template, and add required environment variables. At a bare minimum, you will need an OPENAI_API_KEY to generate a quiz. You will also need a mongodb url to pass to MONGODB_URL to save and fetch quizzes. This project uses better-auth for authentication, so add a better-auth secret, see documentation [here](https://www.better-auth.com/docs/reference/options#secret). You will also need a Google clientId and secret for google social login. You will need to create a project in Google cloud console, please see the better-auth docs for Google social sign on [here](https://www.better-auth.com/docs/authentication/google) for details if you are not familiar with this process.
4. Start the server
   ```bash
   npm run dev
   ```

### Usage

The server should now be running at http://localhost:3000/ (Or the PORT you set in the env file if you didn't use the default)
