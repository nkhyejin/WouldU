from sklearn.preprocessing import LabelEncoder
import numpy as np


class TagsVectorizer:
    
    def __init__(self):
        pass
    
    def tokenize(self, tags_str_arr):
        return [s.split() for s in tags_str_arr]
    
    
    def fit(self, tags_str_arr):
        self.label_encoder = LabelEncoder()
        data = ['<PAD>'] + [item for sublist in self.tokenize(tags_str_arr) for item in sublist]

        self.label_encoder.fit(data)
    
    def transform(self, tags_str_arr, input_ids):

        seq_length = input_ids.shape[1]

        data = self.tokenize(tags_str_arr)
        data = [self.label_encoder.transform(['O'] + x + ['O']).astype(np.int32) for x in data]
        data = np.array(data)
        
        output = np.zeros((len(data), seq_length))
        
        for i in range(len(data)):
            for j in range(len(data[i])):        
                output[i][j] = data[i][j]

        return output
    
    def inverse_transform(self, model_output_3d, input_ids):

        seq_length = input_ids.shape[1]
        slots = np.argmax(model_output_3d, axis=-1)

        slots = [self.label_encoder.inverse_transform(y) for y in slots]
        output = []

        # print('slots :', slots)

        for i in range(len(slots)):
            y = []
            for j in range(seq_length):
                y.append(str(slots[i][j]))
            output.append(y)
        return output

    def simple_inverse_transform(self, slots, input_ids):

        seq_length = input_ids.shape[1]

        slots = [self.label_encoder.inverse_transform(y) for y in slots]
        output = []

        for i in range(len(slots)):
            y = []
            for j in range(seq_length):
                y.append(str(slots[i][j]))
            output.append(y)
        return output
    
    def load(self):
        pass
    
    def save(self):
        pass

    
if __name__ == '__main__':
    tags_str_arr = ['B-game I-game I-game I-game I-game O O', 'O O O O O O O']
    valid_positions = np.array([[1, 1, 0, 0, 0, 0, 1, 0, 1], [1, 1, 0, 1, 0, 0, 1, 0, 1]])
    vectorizer = TagsVectorizer()
    vectorizer.fit(tags_str_arr)
    data = vectorizer.transform(tags_str_arr, valid_positions)
