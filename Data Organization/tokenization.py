from tensorflow.keras.preprocessing.text import Tokenizer # type: ignore

CV_Reader = [

]

# Tokenize
tokenizer = Tokenizer(num_words=5000)
tokenizer.fit_on_texts(CV_Reader)
word_index = tokenizer.word_index
print(word_index)
