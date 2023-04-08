import openai
import tkinter as tk
from mlear import classify_text
import tkinter.messagebox

openai.api_key = 'OPENAI_API_KEY'

def get_response():
    message = user_input.get()
    if message:
        messages.append(
            {"role": "user", "content":message},
        )

        # Sınıflandırmayı yapmak için classify_text fonksiyonunu çağırın
        is_tech = classify_text(message)

        # Eğer metin teknik ise OpenAI Chat api'siyle cevap verin
        if is_tech:
            chat = openai.ChatCompletion.create(
                model ="gpt-3.5-turbo",
                temperature=0.7,
                messages=messages)
            reply = chat.choices[0].message.content
            response.config(text=f"Tamirci: {reply}")
            messages.append({"role": "assistant","content":reply})

        # Eğer metin teknik değilse, kullanıcıya sadece teknik soruları cevaplayabileceği söylenir.
        else:
            response.config(text="Tamirci teknik asistanı olarak sadece teknik sorulara cevap vermek üzerine geliştirildim. Eğer bir hata yaptığımı ve sorunuzun teknik bir sorun olduğunu düşünüyorsanız lütfen farklı bir şekilde sormayı deneyin.")
            messages.append({"role": "assistant","content":"Tamirci teknik asistanı olarak sadece teknik sorulara cevap vermek üzerine geliştirildim. Eğer bir hata yaptığımı ve sorunuzun teknik bir sorun olduğunu düşünüyorsanız lütfen farklı bir şekilde sormayı deneyin."})

    user_input.delete(0, tk.END)

# Başlangıç mesajını oluşturun
messages = [
    {"role": "system", "content":"You are an expert technical support AI called Tamirci developed wtih Python, to  be able to answer only technical questions related to technology or mechanics. Try to answer user questions with as much step-by-step details as possible.Include youtube videos or general articles from the web where possible. Tamirci should be able to provide support for all programming languages and frameworks, and also be able to assist users in multiple languages, such as Turkish and French. The bot should be able to differentiate between technical and non-technical questions, and only respond to the former. If Tamirci receives a non-technical question, it should reply with 'Tamirci teknik asistanı olarak sadece teknik sorulara cevap vermek üzerine geliştirildim. Eğer bir hata yaptığımı ve sorunuzun teknik bir sorun olduğunu düşünüyorsanız lütfen farklı bir şekilde sormayı deneyin.'"
      }]

# GUI arayüzü oluşturun
window = tk.Tk()
window.title("Tamirci")
window.geometry("1600x900")
window.resizable(0,0)

'''
def show_message():
    tkinter.messagebox.showinfo("Tamirci","Merhaba, Tamirci teknik asistana hoşgeldiniz!")
'''


# Kullanıcıdan alınacak girdiyi almak için bir girdi kutusu oluşturun
user_input = tk.Entry(window, width=50, borderwidth=5)
user_input.pack()

# Tamirci'nin cevaplarını göstermek için bir etiket oluşturun
response = tk.Label(window, text="Tamirci: ", font=("Helvetica", 14),wraplength=1600, justify="left")
response.pack(pady=10,padx=0)

# Kullanıcının mesajını göndermek için bir düğme oluşturun
send_button = tk.Button(window, text="Tamirciye Sor!", command=get_response,)
send_button.pack()

window.mainloop()
