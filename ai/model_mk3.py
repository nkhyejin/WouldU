import pandas as pd
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow.keras import layers, Sequential
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.models import Sequential, Model
from tensorflow.keras.layers import Dense, Embedding, Dropout, Conv1D, GlobalMaxPooling1D, Dense, Input, Flatten, Concatenate
from tensorflow.keras.layers import LSTM, SimpleRNN
from tensorflow.keras.preprocessing import sequence
import mecab 
import sentencepiece as spm 

train = pd.read_csv('train.csv')
test = pd.read_csv("test.csv")

train = train.drop(columns = ["시스템응답1",'시스템응답2','시스템응답3','시스템응답4'])

test = test.drop(columns = ["시스템응답1",'시스템응답2','시스템응답3','시스템응답4'])



mecab = mecab.MeCab()

sp = spm.SentencePieceProcessor() 
sp.Load('spm-mediazen.model') 
c
for i in range(len(train['사람문장1'])):
  sen  = " ".join(mecab.morphs(train['사람문장1'][i]))
  train['사람문장1'][i] = sp.EncodeAsPieces(sen)
  
for i in range(len(test['사람문장1'])):
  sen  = " ".join(mecab.morphs(test['사람문장1'][i]))
  test['사람문장1'][i] = sp.EncodeAsPieces(sen)
  
x_train = train['사람문장1']
y_train = train['감정_대분류']
x_test = test['사람문장1']
y_test = test['감정_대분류']

tokenizer=Tokenizer()
tokenizer.fit_on_texts(x_train)

x_train=tokenizer.texts_to_sequences(x_train)

num_token_per_sentence = [ len(sentence) for sentence in x_train ]

x_train_pad=pad_sequences(x_train,maxlen=55,padding='post')

y_train=y_train.replace({'기쁨':0,'당황':1,'분노':2,'불안':3,'상처':4,'슬픔':5})

tokenizer=Tokenizer()
tokenizer.fit_on_texts(x_test)
x_test=tokenizer.texts_to_sequences(x_test)

x_test_pad=pad_sequences(x_test,maxlen=55,padding='post')
y_test=y_test.replace({'기쁨':0,'당황':1,'분노':2,'불안':3,'상처':4,'슬픔':5})



embedding_dim = 128
dropout_ratio = (0.25, 0.5)
num_filters = 128
hidden_units = 128

model_input = Input(shape = (55,))
z = Embedding(9387, embedding_dim, input_length = 55, name="embedding")(model_input)
z = Dropout(dropout_ratio[0])(z)

conv_blocks = []

for sz in [3, 4, 5]:
    conv = Conv1D(filters = num_filters,
                         kernel_size = sz,
                         padding = "valid",
                         activation = "relu",
                         strides = 1)(z)
    conv = GlobalMaxPooling1D()(conv)
    conv_blocks.append(conv)

for sz in [3, 4, 5]:
    conv = Conv1D(filters = 256,
                         kernel_size = sz,
                         padding = "valid",
                         activation = "relu",
                         strides = 1)(z)
    conv = GlobalMaxPooling1D()(conv)
    conv_blocks.append(conv)
    
z = Concatenate()(conv_blocks) if len(conv_blocks) > 1 else conv_blocks[0]
z = Dropout(dropout_ratio[1])(z)
z = Dense(hidden_units, activation="relu")(z)
z = Dense(64, activation="relu")(z)
model_output = Dense(6, activation="softmax")(z)

model = Model(model_input, model_output)

model.compile(
    loss='sparse_categorical_crossentropy',
    optimizer='adam',
    metrics=['accuracy']
)

history = model.fit(x_train_pad, y_train, validation_data=(x_test_pad, y_test), epochs=10, batch_size=2000)

accuracy = history.history['accuracy']
val_accuracy = history.history['val_accuracy']

loss=history.history['loss']
val_loss=history.history['val_loss']

epochs_range = range(10)

plt.figure(figsize=(16, 8))
plt.subplot(1, 2, 1)
plt.plot(epochs_range, accuracy, label='Training Accuracy')
plt.plot(epochs_range, val_accuracy, label='Validation Accuracy')
plt.legend(loc='lower right')
plt.title('Training and Validation Accuracy')

plt.subplot(1, 2, 2)
plt.plot(epochs_range, loss, label='Training Loss')
plt.plot(epochs_range, val_loss, label='Validation Loss')
plt.legend(loc='upper right')
plt.title('Training and Validation Loss')
plt.show()