
def classify_text(text):
    from monkeylearn import MonkeyLearn

    ml = MonkeyLearn('api_key')
    model_id = 'model_id'

    data = [text]
    result = ml.classifiers.classify(model_id, data)
    is_tech = any(classification['tag_name'] == 'tech' for classification in result.body[0]['classifications'])
    return is_tech
