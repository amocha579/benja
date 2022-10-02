# make predictions
from pandas import read_csv
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from sklearn.metrics import confusion_matrix
from sklearn.metrics import accuracy_score
from sklearn.svm import SVC
import numpy as np
import pickle
# Load dataset
url = "/Users/emmajung/Desktop/hackathon/ml_training.csv"
names = ['1_q1', '1_q2', '1_q3', '1_q4', '1_q5', '1_q6', '1_q7', '1_q8', '1_q9', '1_q10','1_q11', '1_q12', '1_q13', '1_q14', '1_q15', '1_q16', '1_q17', '1_q18', '1_q19', '1_q20', '1_q21', '2_q1', '2_q2', '2_q3', '2_q4', '2_q5', '2_q6', '2_q7', '2_q8', '2_q9', '2_q10','2_q11', '2_q12', '2_q13', '2_q14', '2_q15', '2_q16', '2_q17', '2_q18', '2_q19', '2_q20', '2_q21', 'answer']
dataset = read_csv(url, names = names)

# Split-out validation dataset
array = dataset.values
X = array[:,0:42]
y = array[:,42]
X_train, X_validation, Y_train, Y_validation = train_test_split(X, y, test_size=0.20, random_state=1)
# Make predictions on validation dataset
model = SVC(gamma='auto')
model.fit(X_train, Y_train)
predictions = model.predict(X_validation)
# Evaluate predictions
print(accuracy_score(Y_validation, predictions))
print(confusion_matrix(Y_validation, predictions))
print(classification_report(Y_validation, predictions))

# save the model to disk
filename = '/Users/emmajung/Desktop/hackathon/finalized_model.sav'
pickle.dump(model, open(filename, 'wb'))
# load the model from disk
loaded_model = pickle.load(open(filename, 'rb'))
X_test = [[1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]]
result = loaded_model.predict(X_test)
print(result)
