import os
from tensorflow.keras.preprocessing.text import Tokenizer # type: ignore

# Initialize the list to store the content of each CV
CV_Reader = []

# Define the directory where the extracted files are saved
extracted_files_directory = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "Extracted File")

# Loop through the files in the "Extracted File" directory and read their content
for filename in os.listdir(extracted_files_directory):
    if filename.endswith("_CV_output.txt"):  # Ensure it matches the naming pattern for CV files
        file_path = os.path.join(extracted_files_directory, filename)
        try:
            with open(file_path, "r", encoding="utf-8") as file:
                cv_content = file.read()
                CV_Reader.append(cv_content)  # Append the content of each file to the list
        except Exception as e:
            print(f"Error reading {filename}: {e}")

# Tokenize the text from all the CVs
tokenizer = Tokenizer(num_words=5000)
tokenizer.fit_on_texts(CV_Reader)
word_index = tokenizer.word_index

# Print the word index to see the mapping of words to indices
print(word_index)
