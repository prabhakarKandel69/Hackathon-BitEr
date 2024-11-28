import os
import google.generativeai as genai

# Configure Gemini API key
genai.configure(api_key="AIzaSyA6hggl7OJMy_kjyCLbF14cAbIcu3dPFBY")

# Create the model configuration
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",  # You can change this to the specific model you want to use
    generation_config=generation_config,
)

# Function to categorize extracted data with Gemini API
def categorize_data_with_gemini(extracted_data):
    chat_session = model.start_chat(
        history=[
            {
                "role": "system",
                "content": {
                    "parts": [
                        {"text": "You are a helpful assistant that categorizes CV data."}
                    ]
                }
            },
            {
                "role": "user",
                "content": {
                    "parts": [
                        {"text": extracted_data}
                    ]
                }
            }
        ]
    )

    # Send the message and get the response
    response = chat_session.send_message(extracted_data)
    return response.text  # Return the categorization response

# Function to process and categorize the entire extracted data from multiple files
def process_extracted_files(directory_path):
    categorized_data = {
        'Profile': [],
        'Projects': [],
        'Experience': [],
        'Education': [],
        'Certification': [],
        'Skills': []
    }

    # Verify and print the absolute path of the directory
    absolute_directory_path = os.path.abspath(directory_path)
    print(f"Absolute path: {absolute_directory_path}")

    if os.path.exists(absolute_directory_path):
        print(f"Directory found: {absolute_directory_path}")
        
        # Loop through each file in the directory
        for filename in os.listdir(absolute_directory_path):
            file_path = os.path.join(absolute_directory_path, filename)

            if os.path.isfile(file_path):
                print(f"Processing file: {filename}")

                with open(file_path, 'r', encoding='utf-8') as file:
                    extracted_data = file.read()  # Read the content of the file
                    
                    # Split the data into smaller chunks or sentences if necessary
                    chunks = extracted_data.split("\n")
                    
                    # Categorize each chunk of data
                    for chunk in chunks:
                        if chunk.strip():
                            # Call Gemini to categorize the chunk of data
                            result = categorize_data_with_gemini(chunk)
                            
                            if result:
                                # Assuming result contains the category name, map accordingly
                                if "profile" in result.lower():
                                    categorized_data['Profile'].append(chunk)
                                elif "project" in result.lower():
                                    categorized_data['Projects'].append(chunk)
                                elif "experience" in result.lower():
                                    categorized_data['Experience'].append(chunk)
                                elif "education" in result.lower():
                                    categorized_data['Education'].append(chunk)
                                elif "certification" in result.lower():
                                    categorized_data['Certification'].append(chunk)
                                elif "skills" in result.lower():
                                    categorized_data['Skills'].append(chunk)

    else:
        print(f"Directory not found: {absolute_directory_path}")

    return categorized_data

# Path to the "Extracted File" directory (absolute path)
directory_path = r'D:\Project\Hackathon\Extracted File'  # Absolute path to the "Extracted File" directory

# Process the extracted files in the directory
categorized_data = process_extracted_files(directory_path)

# Print the categorized data
for section, data in categorized_data.items():
    print(f"\n{section} Section:")
    for item in data:
        print(f"- {item}")
