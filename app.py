from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

# 配置
app.config['SOFTWARE_NAME'] = "我的软件"
app.config['SOFTWARE_VERSION'] = "1.0.0"
app.config['DOWNLOAD_LINK'] = "/download/my-software-v1.0.0.zip"

@app.route('/')
def index():
    return render_template('index.html', 
                          software_name=app.config['SOFTWARE_NAME'],
                          software_version=app.config['SOFTWARE_VERSION'])

@app.route('/download/<path:filename>')
def download_file(filename):
    return send_from_directory('downloads', filename, as_attachment=True)

if __name__ == '__main__':
    # 创建downloads文件夹（如果不存在）
    os.makedirs('downloads', exist_ok=True)
    
    # 创建一个示例下载文件（你可以替换为你的实际软件文件）
    with open('downloads/my-software-v1.0.0.zip', 'w') as f:
        f.write("这是一个示例软件文件")
    
    app.run(host='0.0.0.0', port=80)