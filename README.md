# QuizKnit

Backend for QuizKnit, a web application that generates quizzes based on user provided text. It can be used as an educational tool to quickly create comprehension quizzes or as a fun way to test knowledge from any content you input. You can view a working demo at https://quizknit.com/

Frontend Repo: https://github.com/jibolash/quizknit-react

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
3. **Environment Configuration**

   Create a `.env` file using `.sample.env` as your template, then add the following required variables:

   **Required Variables**

   **OpenAI API Key**

   - Get your API key from [OpenAI](https://platform.openai.com/api-keys)
   - Add your `OPENAI_API_KEY`. This is needed to generate quizzes

   **Database Connection**

   - Set `MONGODB_URL` to save and retrieve quizzes
   - You can use MongoDB Atlas (free tier available) or a local MongoDB instance

   **Authentication Secret**

   - Add a `BETTER_AUTH_SECRET` for session management
   - Generate a random string or use the [Better Auth documentation](https://www.better-auth.com/docs/reference/options#secret) for guidance

   **Get Google Credentials, (Required for Social Login)**

   You will need to create a project in Google cloud console, please see the better-auth [docs](https://www.better-auth.com/docs/authentication/google) for Google social sign on here for details if you are not familiar with this process.

   **Add to .env:**

   - `GOOGLE_CLIENT_ID` - Your Google OAuth client ID
   - `GOOGLE_CLIENT_SECRET` - Your Google OAuth client secret

4. Start the server

   ```bash
   npm run dev
   ```

### Usage

The server should now be running at http://localhost:3000/ (Or the PORT you set in the env file if you didn't use the default)
