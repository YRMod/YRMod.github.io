// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 添加平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 为下载按钮添加点击效果
    const downloadBtns = document.querySelectorAll('.download-btn');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // 背景音乐播放
    const musicPlayer = document.getElementById('background-music');
    musicPlayer.volume = 0.5; // 设置音量
    musicPlayer.play().catch(e => {
        console.log('自动播放被阻止，需要用户交互才能播放音乐。', e);
    });

    // 添加音乐控制按钮
    const musicControlBtn = document.createElement('button');
    musicControlBtn.textContent = '暂停音乐';
    musicControlBtn.style.position = 'fixed';
    musicControlBtn.style.bottom = '20px';
    musicControlBtn.style.right = '20px';
    musicControlBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    musicControlBtn.style.color = 'white';
    musicControlBtn.style.border = 'none';
    musicControlBtn.style.padding = '10px 15px';
    musicControlBtn.style.borderRadius = '5px';
    musicControlBtn.style.cursor = 'pointer';
    musicControlBtn.addEventListener('click', () => {
        if (musicPlayer.paused) {
            musicPlayer.play();
            musicControlBtn.textContent = '暂停音乐';
        } else {
            musicPlayer.pause();
            musicControlBtn.textContent = '继续播放';
        }
    });
    document.body.appendChild(musicControlBtn);

    // 为“加入我们”按钮添加点击事件
    const joinBtn = document.getElementById('join-us');
    if (joinBtn) {
        joinBtn.addEventListener('click', function() {
            // 替换为你想要跳转的实际链接
            window.open('https://t.me/YRModOfficial', '_blank');
        });
    }
});