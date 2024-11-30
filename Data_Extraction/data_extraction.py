import fitz  # PyMuPDF
import pytesseract
import os
import zipfile
import requests
from PIL import Image

# Set up Tesseract executable path if not in PATH
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"  # Update if needed


def download_file(url, output_dir):
    """
    Download a file from a URL and save it locally.
    :param url: URL of the file to download.
    :param output_dir: Directory where the file will be saved.
    :return: Path to the downloaded file.
    """
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise HTTPError for bad responses
        filename = os.path.basename(url.rstrip("/"))  # Get filename from URL
        file_path = os.path.join(output_dir, filename)
        with open(file_path, 'wb') as file:
            file.write(response.content)
        print(f"Downloaded file: {file_path}")
        return file_path
    except Exception as e:
        print(f"Error downloading file from {url}: {e}")
        return None


def extract_zip_file(zip_path, extract_to):
    """
    Extract a zip file to a specified directory.
    :param zip_path: Path to the zip file.
    :param extract_to: Directory where the zip file will be extracted.
    """
    try:
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(extract_to)
        print(f"Extracted zip file to: {extract_to}")
    except Exception as e:
        print(f"Error extracting zip file {zip_path}: {e}")


def extract_text_from_pdf(pdf_path):
    """
    Extract text from a PDF file.
    :param pdf_path: Path to the PDF file.
    :return: Extracted text as a string.
    """
    try:
        text = ""
        with fitz.open(pdf_path) as pdf:
            for page in pdf:
                text += page.get_text()
        return text
    except Exception as e:
        print(f"Error extracting text from {pdf_path}: {e}")
        return None


def extract_text_from_image(image_path):
    """
    Extract text from an image using Tesseract OCR.
    :param image_path: Path to the image file.
    :return: Extracted text as a string.
    """
    try:
        img = Image.open(image_path)
        text = pytesseract.image_to_string(img)
        return text
    except Exception as e:
        print(f"Error extracting text from {image_path}: {e}")
        return None


if __name__ == "__main__":
    # Define the URL of the zip file
    zip_url = "https://poudelsangam.com.np/hackathon/cv/cv1.pdf"

    # Define the base directory structure
    base_dir = os.path.dirname(os.path.abspath(__file__))  # Get the script's directory
    file_directory = os.path.join(base_dir, "..", "File")  # Path to File directory
    extracted_file_directory = os.path.join(base_dir, "..", "Extracted File")  # Path to Extracted File directory

    # Ensure directories exist
    if not os.path.exists(file_directory):
        os.makedirs(file_directory)
    if not os.path.exists(extracted_file_directory):
        os.makedirs(extracted_file_directory)

    # Download the zip file to the "File" directory
    downloaded_zip_path = download_file(zip_url, file_directory)

    if downloaded_zip_path:
        # Extract the zip file to the "File" directory
        extract_zip_file(downloaded_zip_path, file_directory)

        # Process files in the "File" directory
        for filename in os.listdir(file_directory):
            file_path = os.path.join(file_directory, filename)
            if filename.endswith(".pdf"):
                # Extract text from PDFs
                text = extract_text_from_pdf(file_path)
                if text:
                    output_file = os.path.join(extracted_file_directory, f"{os.path.splitext(filename)[0]}_output.txt")
                    with open(output_file, "w", encoding="utf-8") as output:
                        output.write(f"--- Start of {filename} ---\n")
                        output.write(text)
                        output.write(f"\n--- End of {filename} ---\n")
                    print(f"Processed PDF and saved text to: {output_file}")
            elif filename.lower().endswith(('.png', '.jpg', '.jpeg')):
                # Extract text from images
                text = extract_text_from_image(file_path)
                if text:
                    output_file = os.path.join(extracted_file_directory, f"{os.path.splitext(filename)[0]}_output.txt")
                    with open(output_file, "w", encoding="utf-8") as output:
                        output.write(f"--- Start of {filename} ---\n")
                        output.write(text)
                        output.write(f"\n--- End of {filename} ---\n")
                    print(f"Processed image and saved text to: {output_file}")