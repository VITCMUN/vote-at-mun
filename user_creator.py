from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
import pandas as pd

username = input("Enter admin's username : ")
password = input("Enter the admin's password : ")
excel_file_path = input("Enter path to excel file : ")
browser = webdriver.Chrome()
browser.get('localhost:3000')
wait = WebDriverWait(browser, 10)
df = pd.read_excel(excel_file_path)

def handleLogin(usname, pwd):
    username = browser.find_element_by_css_selector(
        "#root > div > div.RightContainer > div > div > form > input[type=text]:nth-child(1)")
    username.send_keys(usname)
    password = browser.find_element_by_css_selector(
        "#root > div > div.RightContainer > div > div > form > input[type=password]:nth-child(2)")
    password.send_keys(pwd)
    username.submit()


def addUserButtonClick():
    wait.until(lambda browser: browser.find_element_by_css_selector(
        "#root > div > div > div > div.pagecontent > div:nth-child(1) > p"))
    browser.find_element_by_css_selector(
        "#root > div > div > div > div.pagecontent > div:nth-child(1) > p").click()


def createUser(usname, pwd):
    wait.until(lambda browser: browser.find_element_by_css_selector("#password"))
    username = browser.find_element_by_css_selector("#username")
    username.send_keys(usname)
    password = browser.find_element_by_css_selector("#password")
    password.send_keys(pwd)
    username.submit()

handleLogin(username, password)

for i in df.index:
    addUserButtonClick()
    delegate_username = df["country"][i]
    delegate_password = df["password"][i]
    createUser(delegate_username, delegate_password)