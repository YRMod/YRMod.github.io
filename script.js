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
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    }

    // 为功能卡片添加动画效果
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = 'none';
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

    // Firebase 配置
    const firebaseConfig = {
        apiKey: "AIzaSyBQD5V2NBnYKb-nQVw4e2rj0ZC6HfY6LHg",
        authDomain: "my-software-website.firebaseapp.com",
        databaseURL: "https://my-software-website-default-rtdatabase.firebaseio.com",
        projectId: "my-software-website",
        storageBucket: "my-software-website.appspot.com",
        messagingSenderId: "1234567890",
        appId: "1:1234567890:web:abc123def456ghi789"
    };

    // 初始化 Firebase
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
    const commentsRef = database.ref('comments');

    // 获取 DOM 元素
    const commentInput = document.getElementById('comment-input');
    const submitCommentBtn = document.getElementById('submit-comment');
    const commentsContainer = document.getElementById('comments-container');

    // 提交评论
    submitCommentBtn.addEventListener('click', () => {
        const commentText = commentInput.value.trim();
        if (commentText) {
            const comment = {
                author: "匿名用户", // 你可以根据需要修改为获取用户输入的用户名
                content: commentText,
                timestamp: Date.now()
            };

            commentsRef.push(comment);
            commentInput.value = '';
        }
    });

    // 显示评论
    commentsRef.on('child_added', (snapshot) => {
        const comment = snapshot.val();
        const commentElement = createCommentElement(comment);
        commentsContainer.prepend(commentElement);
    });

    // 创建评论元素
    function createCommentElement(comment) {
        const commentCard = document.createElement('div');
        commentCard.className = 'comment-card';

        const commentHeader = document.createElement('div');
        commentHeader.className = 'comment-header';

        const commentAuthor = document.createElement('span');
        commentAuthor.className = 'comment-author';
        commentAuthor.textContent = comment.author;

        const commentDate = document.createElement('span');
        commentDate.className = 'comment-date';
        commentDate.textContent = formatDate(comment.timestamp);

        commentHeader.appendChild(commentAuthor);
        commentHeader.appendChild(commentDate);

        const commentContent = document.createElement('p');
        commentContent.className = 'comment-content';
        commentContent.textContent = comment.content;

        commentCard.appendChild(commentHeader);
        commentCard.appendChild(commentContent);

        return commentCard;
    }

    // 格式化日期
    function formatDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }
});