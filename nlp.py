
from monkeylearn import MonkeyLearn

ml = MonkeyLearn('monkeylearn_api_key')
model_id = 'monkeylearn_model_id'

while True:
    data = [input("Lütfen bir metin girin: \n")]
    result = ml.classifiers.classify(model_id, data)
    isrelated = [classification ['tag_name'] for classification  in result.body[0]['classifications']]
    print(isrelated)
    ##print(result.body)
