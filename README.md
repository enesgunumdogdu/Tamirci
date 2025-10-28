# Tamirci - Technical Support AI Assistant

Tamirci is an intelligent technical support assistant that uses AI to answer only technology and mechanics-related questions. The project leverages MonkeyLearn for question classification and OpenAI's GPT-3.5-turbo for generating detailed technical responses.

## Features

- **Intelligent Question Classification**: Uses MonkeyLearn API to determine if a question is technical
- **AI-Powered Responses**: Generates detailed, step-by-step technical answers using OpenAI GPT-3.5-turbo
- **Multi-language Support**: Responds in multiple languages including English, Turkish, and French
- **Smart Filtering**: Only responds to technical questions, politely declining non-technical queries
- **Detailed Guidance**: Includes YouTube videos and web articles in responses when applicable
- **Comprehensive Support**: Covers all programming languages, frameworks, and technical topics

## Project Structure

- **oai.py**: Main application with Tkinter GUI
- **mlear.py**: MonkeyLearn integration for text classification
- **RelatedToTech.csv**: Training dataset with 999 tech/non-tech labeled texts

## Prerequisites

- Python 3.7+
- tkinter
- openai
- monkeylearn

## Installation & Setup

1. Install required packages:
```bash
pip install openai monkeylearn
```

2. Set up environment variables:
   - Replace `OPENAI_API_KEY` in `oai.py` with your OpenAI API key
   - Replace `api_key` and `model_id` in `mlear.py` with your MonkeyLearn credentials

3. Run the application:
```bash
python oai.py
```

## API Configuration

### OpenAI API
- Get your API key from [OpenAI Platform](https://platform.openai.com/)
- Uses GPT-3.5-turbo model for chat completions
- Temperature: 0.7 for balanced creativity
- Max tokens: 1000 for detailed responses

### MonkeyLearn API
- Get your API key from [MonkeyLearn](https://monkeylearn.com/)
- Create or use a pre-trained text classification model
- Model should classify text as 'tech' or 'non-tech'

## Dataset

The project includes `RelatedToTech.csv`, a dataset containing 999 examples of technical and non-technical texts. This can be used for:
- Training custom MonkeyLearn models
- Testing the classification accuracy
- Understanding the scope of technical questions

## How It Works

1. **User Input**: User submits a question through the interface
2. **Classification**: MonkeyLearn API analyzes if the question is tech-related
3. **Response Generation**: 
   - If technical: OpenAI generates a detailed, helpful response
   - If non-technical: Returns a polite message explaining the limitation
4. **Conversation History**: Maintains context for follow-up questions

## Response Examples

**For Technical Questions:**
Tamirci provides detailed, step-by-step instructions with relevant resources, YouTube links, and article references.

**For Non-Technical Questions:**
"I am Tamirci technical assistant, developed to answer only technical questions. If you think I made an error and your question is technical, please try asking it differently."

## Future Enhancements

- Web interface deployment
- Support for more AI models
- Enhanced conversation memory
- Code snippet execution
- Integration with technical documentation APIs
- Real-time collaboration features

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## Support

For questions or support, please open an issue in the repository.
