// const btn = document.querySelector('.btn')
// const buttons = document.querySelectorAll('.btn')
// const sidebar = document.querySelector('.sidebar')
// const content = document.querySelector('.content')

// buttons.forEach((btn) => {
//     btn.addEventListener('click', () => {
//         if (window.innerWidth > 768) {
//             sidebar.classList.toggle('collapsed')
//             content.classList.toggle('expanded')
//         } else {
//             sidebar.classList.toggle('active')
//             content.classList.toggle('masked')
//         }
//         if (content.classList.contains('expanded')) {
//             // 原btn被隐藏，需要在content中克隆原btn
//             const clonedBtn = btn.cloneNode(true)
//             content.appendChild(clonedBtn)
//         }
//     })
// })

// 下面的方法只会复制原按钮的HTML结构和样式，但不会复制其事件监听器
// const newBtn = document.createElement('div');
// newBtn.innerHTML = `<button type="button" class="btn btn-primary"><i
//                 class="bi bi-layout-sidebar-inset"></i>`
// content.appendChild(newBtn);


// // 获取页面中所有的 .btn 元素
// let buttons = document.querySelectorAll('.btn');
// const sidebar = document.querySelector('.sidebar');
// const content = document.querySelector('.content');

// // 函数：添加克隆按钮
// function addClonedButton(button) {
//     if (!content.querySelector('.btn.cloned')) {
//         const clonedBtn = button.cloneNode(true);
//         clonedBtn.classList.add('cloned');
//         content.appendChild(clonedBtn);

//         // 为克隆的按钮重新添加事件监听
//         clonedBtn.addEventListener('click', () => {
//             toggleNav();
//             removeClonedButtons(); // 点击克隆按钮时，移除所有克隆按钮
//         });
//     }
// }

// // 函数：删除克隆按钮
// function removeClonedButtons() {
//     const clonedBtns = content.querySelectorAll('.btn.cloned');
//     clonedBtns.forEach(clonedBtn => clonedBtn.remove());
// }

// // 函数：切换导航状态
// function toggleNav() {
//     if (window.innerWidth > 768) {
//         sidebar.classList.toggle('collapsed');
//         content.classList.toggle('expanded');
//     } else {
//         sidebar.classList.toggle('active');
//         content.classList.toggle('masked');
//     }
// }

// // 遍历所有按钮并添加事件监听
// buttons.forEach((button) => {
//     button.addEventListener('click', () => {
//         toggleNav();

//         // 如果内容区域被展开
//         if (content.classList.contains('expanded')) {
//             addClonedButton(button);
//         } else {
//             // 删除所有克隆的按钮
//             removeClonedButtons();
//         }
//     });
// });
// ------------------------------------------------------------------------


// 处理侧导航栏按钮逻辑
// 获取页面中所有的 .btn-toggle 元素
const buttons = document.querySelectorAll('.btn-toggle');
const sidebar = document.querySelector('.sidebar');
const content = document.querySelector('.content');
const topbar = document.querySelector('.topbar')

// 定义克隆按钮的类名
const CLONED_CLASS = 'cloned';

// 函数：切换导航状态
function toggleNav() {
  // 初始状态：sidebar展开
  if (window.innerWidth > 768) {
    sidebar.classList.toggle('collapsed');
    content.classList.toggle('expanded');
  } else {
    sidebar.classList.toggle('active');
    content.classList.toggle('masked');
  }
}

// 函数：添加克隆按钮
function addClonedButton(button) {
  // 检查是否已有克隆按钮，若有则不再克隆
  if (!content.querySelector(`.btn-toggle.${CLONED_CLASS}`)) {
    // 克隆原按钮
    const clonedBtn = button.cloneNode(true);

    // 给克隆的按钮添加标识
    clonedBtn.classList.add(CLONED_CLASS);

    // 添加到内容容器中
    topbar.appendChild(clonedBtn);

    // 为克隆的按钮重新添加事件监听
    clonedBtn.addEventListener('click', () => {
      toggleNav();
      if (window.innerWidth > 768) {
        if (!content.classList.contains('expanded')) {
          removeClonedButtons();
        }
      }
    });
  }
}

// 函数：删除克隆按钮
function removeClonedButtons() {

  const clonedBtns = topbar.querySelectorAll(`.btn-toggle.${CLONED_CLASS}`);
  clonedBtns.forEach(clonedBtn => clonedBtn.remove());
}

// 函数：处理响应式逻辑
function handleResponsive() {
  if (window.innerWidth <= 768) {
    if (sidebar.classList.contains('collapsed')) {
      sidebar.classList.remove('collapsed')
    }
    if (content.classList.contains('expanded')) {
      content.classList.remove('expanded')
    }
    // 在小屏幕下，确保克隆按钮存在
    const buttonToClone = buttons[0];
    if (buttonToClone) {
      addClonedButton(buttonToClone);
    }
  } else {
    // 在大屏幕下，当侧导航栏未隐藏且内容区未出于展开状态时，删除所有克隆按钮
    // if (!sidebar.classList.contains('collapsed') && !content.classList.contains('expanded')) {
    removeClonedButtons();
    // }
  }
}

// 初始调用，设置页面初始状态
handleResponsive();

// 监听窗口大小变化，动态添加或删除克隆按钮
window.addEventListener('resize', handleResponsive);

// 遍历所有原始按钮并添加事件监听
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    toggleNav();

    // 在大屏幕下，根据导航状态添加或删除克隆按钮
    if (window.innerWidth > 768) {
      if (content.classList.contains('expanded')) {

        addClonedButton(button);
      } else {
        removeClonedButtons();
      }
    }

    // 在小屏幕下，已通过 handleResponsive 函数管理克隆按钮
  });
});
// ------------------------------------------------------------------------


// input长度动效
const innerInput = document.querySelector('.content .send .form-control')
const input = document.querySelector('.content .send')
window.addEventListener('resize', function () {
  if (window.innerWidth < 910)
    input.style.width = '70%'
})
innerInput.addEventListener('focus', function () {
    input.style.width = '70%'
})
innerInput.addEventListener('blur', function () {
  if (window.innerWidth > 910)
    input.style.width = '30%'
})
// ------------------------------------------------------------------------


// 轮播字效果
function dataShow() {
  const show = document.querySelector('.initial span[data-show]')
  const next = show.nextElementSibling || document.querySelector('.initial span:first-child')
  const up = document.querySelector('.initial span[data-up]')
  if (up) {
    up.removeAttribute('data-up')
  }

  show.removeAttribute('data-show')
  show.setAttribute('data-up', '')
  next.setAttribute('data-show', '')
}
let timer = setInterval(dataShow, 2000)
// ------------------------------------------------------------------------


// ！对话/设置功能
// 获取DOM元素
const newSessionBtn = document.querySelector('.btn-new-session');
const sessionList = document.querySelector('.session-list');
const messagesContainer = document.querySelector('.conversation');
const sendButton = document.querySelector('.send-button');
const userInput = document.querySelector('.user-input');

const openSettingsBtn = document.getElementById('open-settings');
const settingsModal = document.getElementById('settings-modal');
const closeSettingsBtn = document.querySelector('.close-button');
const themeToggleBtn = document.getElementById('theme-toggle');
const responseLengthSelect = document.getElementById('response-length');
const temperatureSlider = document.getElementById('temperature');
const temperatureValue = document.getElementById('temperature-value');
const autoToggleCheckbox = document.getElementById('auto-toggle');

// 应用状态
let sessions = [];             // 存储所有会话的数组
let currentSessionId = null;   // 当前选中的会话ID
let autoToggle = true;         // 是否根据系统偏好自动切换主题

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
  loadSessions();        // 载入会话数据
  loadSettings();        // 载入用户设置
  renderSessionList();   // 渲染会话列表
  // if (currentSessionId) {
  //   renderMessages();    // 渲染当前会话的消息
  // }
});

// 载入会话数据
function loadSessions() {
  const storedSessions = localStorage.getItem('sessions');
  if (storedSessions) {
    sessions = JSON.parse(storedSessions);
    // if (sessions.length > 0) {
    //   currentSessionId = sessions[0].id;
    // }
  }
}

// 载入用户设置
function loadSettings() {
  const storedTheme = localStorage.getItem('theme');
  const storedAutoToggle = localStorage.getItem('auto-toggle');
  const storedResponseLength = localStorage.getItem('responseLength');
  const storedTemperature = localStorage.getItem('temperature');

  // 主题设置
  if (storedTheme) {
    document.documentElement.classList.toggle('dark-theme', storedTheme === 'dark');
  } else {
    // 如果没有存储主题偏好，依据系统偏好设置主题
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark-theme', prefersDark);
    localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
  }

  // 自动切换主题设置
  if (storedAutoToggle !== null) {
    autoToggle = storedAutoToggle === 'true';
    autoToggleCheckbox.checked = autoToggle;
  } else {
    // 默认启用自动切换
    autoToggle = true;
    autoToggleCheckbox.checked = true;
    localStorage.setItem('auto-toggle', 'true');
  }

  // AI回答长度设置
  if (storedResponseLength) {
    responseLengthSelect.value = storedResponseLength;
  }

  // 模型温度设置
  if (storedTemperature) {
    temperatureSlider.value = storedTemperature;
    temperatureValue.textContent = storedTemperature;
  }

  // 监听系统颜色偏好变化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (autoToggle) {
      document.documentElement.classList.toggle('dark-theme', e.matches);
      localStorage.setItem('theme', e.matches ? 'dark' : 'light');
    }
  });
}

// 保存会话数据
function saveSessions() {
  localStorage.setItem('sessions', JSON.stringify(sessions));
}

// 保存用户设置
function saveSettings() {
  const theme = document.documentElement.classList.contains('dark-theme') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  localStorage.setItem('auto-toggle', autoToggleCheckbox.checked);
  localStorage.setItem('responseLength', responseLengthSelect.value);
  localStorage.setItem('temperature', temperatureSlider.value);
}

// 渲染会话列表
function renderSessionList() {
  sessionList.innerHTML = ''; // 清空现有列表
  // console.log(111);


  sessions.forEach(session => {
    const li = document.createElement('li');
    li.classList.add('session-item');
    if (session.id === currentSessionId) {
      li.classList.add('active'); // 标记当前会话
    }
    li.addEventListener('click', () => switchSession(session.id));

    // 会话名称部分
    const span = document.createElement('span');
    span.textContent = session.name;

    // 删除按钮
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '&times;';
    deleteBtn.setAttribute('title', '删除会话'); // 提示信息
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // 阻止事件冒泡，避免触发切换会话
      deleteSession(session.id);
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    sessionList.appendChild(li);
  });
}

// 创建新会话
newSessionBtn.addEventListener('click', () => {
  const sessionName = prompt('请输入新会话名称：', `会话${sessions.length + 1}`);
  if (sessionName) {
    // 检查会话名称是否已存在
    const exists = sessions.some(session => session.name === sessionName);
    if (exists) {
      alert('会话名称已存在，请选择其他名称。');
      return;
    }

    // 创建新会话对象
    const newSession = {
      id: generateSimpleID(), // 使用简化的ID生成函数
      name: sessionName,
      messages: [],
      settings: {
        responseLength: responseLengthSelect.value,
        temperature: parseFloat(temperatureSlider.value),
      },
    };

    sessions.push(newSession);       // 添加到会话数组
    currentSessionId = newSession.id; // 设置为当前会话
    saveSessions();                  // 保存到localStorage
    // console.log(111);

    renderSessionList();             // 重新渲染会话列表
    // renderMessages();                // 重新渲染消息窗口
  } else {
    alert('会话名称不能为空。');
  }
});

// 切换会话
function switchSession(sessionId) {
  currentSessionId = sessionId;
  renderSessionList(); // 重新渲染会话列表以反映当前会话
  renderMessages();    // 渲染当前会话的消息
  // 小屏下自动隐藏边栏
  if (sidebar.classList.contains('active')) {
    sidebar.classList.remove('active')
    content.classList.remove('masked')
  }
}

// 删除会话
function deleteSession(sessionId) {
  const confirmDelete = confirm('确定要删除此会话吗？');
  if (confirmDelete) {
    sessions = sessions.filter(session => session.id !== sessionId); // 从会话数组中移除

    // if (sessions.length > 0) {
    //   currentSessionId = sessions[0].id; // 切换到第一个会话
    // } else {
    //   currentSessionId = null; // 无会话时设置为null
    // }
    currentSessionId = null;

    saveSessions();      // 更新localStorage
    renderSessionList(); // 重新渲染会话列表
    renderMessages();    // 重新渲染消息窗口
  }
}

// 渲染消息
function renderMessages() {
  messagesContainer.innerHTML = ''; // 清空现有消息
  clearInterval(timer)
  const currentSession = sessions.find(session => session.id === currentSessionId);

  if (currentSession) {
    currentSession.messages.forEach(msg => {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message', msg.sender); // 添加类名区分用户和AI
      messageDiv.textContent = msg.text;
      messagesContainer.appendChild(messageDiv);
    });
    // 自动滚动到底部
    // console.log(messagesContainer.scrollTop);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

  } else {
    messagesContainer.innerHTML = `            
      <div class="initial">
        <h2>Let's talk about
          <div class="mask">
            <span data-show>Coding.</span>
            <span>Workout.</span>
            <span>Emotion.</span>
            <span>Literature.</span>
          </div>
        </h2>
      </div>`;
    timer = setInterval(dataShow, 2000)
  }
}

// 发送消息
sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

/**
 * 处理发送消息的逻辑
 */
function sendMessage() {
  const text = userInput.value.trim(); // 获取用户输入并去除首尾空白
  // if (text === '' || !currentSessionId) return; // 如果输入为空或无当前会话，退出
  if (text === '') return; // 如果输入为空或无当前会话，退出

  if (!currentSessionId) {
    const sessionName = `会话${sessions.length + 1}`;
    if (sessionName) {
      // 检查会话名称是否已存在
      const exists = sessions.some(session => session.name === sessionName);
      if (exists) {
        alert('会话自动初始化失败，请先手动创建会话。');
        return;
      }
    }

      // 创建新会话对象
      const newSession = {
        id: generateSimpleID(), // 使用简化的ID生成函数
        name: sessionName,
        messages: [],
        settings: {
          responseLength: responseLengthSelect.value,
          temperature: parseFloat(temperatureSlider.value),
        },
      };

      sessions.push(newSession);       // 添加到会话数组
      currentSessionId = newSession.id; // 设置为当前会话
      saveSessions();                  // 保存到localStorage

      renderSessionList();             // 重新渲染会话列表
      // renderMessages();                // 重新渲染消息窗口
    }

    const currentSession = sessions.find(session => session.id === currentSessionId);
    if (currentSession) {
      console.log(555);

      const userMessage = { sender: 'user', text, timestamp: Date.now() };
      currentSession.messages.push(userMessage); // 添加用户消息
      saveSessions();                           // 保存会话数据
      renderMessages();                         // 重新渲染消息
      userInput.value = '';                     // 清空输入框

      // 模拟AI回复
      simulateAIResponse(currentSession);
    }
  }

  /**
   * 模拟AI回复
   * 根据会话的设置，生成相应长度的回复并添加到消息中
   * @param {Object} session - 当前会话对象
   */
  function simulateAIResponse(session) {
    const delay = 1000; // 1秒延迟，模拟AI生成回复的时间
    setTimeout(() => {
      const aiResponse = generateMockResponse(session.settings.responseLength); // 根据设置生成回复
      const aiMessage = { sender: 'ai', text: aiResponse, timestamp: Date.now() };
      session.messages.push(aiMessage); // 添加AI消息
      saveSessions();                    // 保存会话数据
      renderMessages();                  // 重新渲染消息
    }, delay);
  }

  /**
   * 生成模拟AI回复
   * 根据指定的回复长度，随机选择一个预设的回复
   * @param {string} length - 回复长度类型（short, medium, long）
   * @returns {string} - AI回复的文本
   */
  function generateMockResponse(length) {
    const shortResponses = [
      '好的。',
      '明白了。',
      '了解。',
      '谢谢！',
    ];
    const mediumResponses = [
      '这是一个模拟回复。',
      '我理解您的意思。',
      '您能详细说明一下吗？',
      '当然，我可以帮助您。',
    ];
    const longResponses = [
      '这是一个详细的模拟回复，旨在展示如何根据不同的回答长度设置AI的响应内容。您可以根据需要调整这些内容。',
      '感谢您与我交流。如果您有更多问题或需要进一步的帮助，请随时告诉我。',
      '当然，我可以为您提供更详细的信息。请告诉我您具体需要了解哪些方面。',
      '好的，让我们深入探讨这个话题。您有任何具体的问题或需要我解释的部分吗？',
    ];

    if (length === 'short') {
      return shortResponses[Math.floor(Math.random() * shortResponses.length)];
    } else if (length === 'medium') {
      return mediumResponses[Math.floor(Math.random() * mediumResponses.length)];
    } else if (length === 'long') {
      return longResponses[Math.floor(Math.random() * longResponses.length)];
    } else {
      return mediumResponses[Math.floor(Math.random() * mediumResponses.length)];
    }
  }

  /**
   * 生成唯一ID
   * 结合当前时间戳和随机数生成相对唯一的ID
   * @returns {string} - 生成的唯一ID
   */
  function generateSimpleID() {
    const timestamp = Date.now(); // 当前时间戳（毫秒）
    const randomNum = Math.floor(Math.random() * 1000); // 生成0-999的随机整数
    return `id-${timestamp}-${randomNum}`;
  }

  // 打开设置面板
  openSettingsBtn.addEventListener('click', () => {
    settingsModal.classList.remove('hidden');
  });

  // 关闭设置面板
  closeSettingsBtn.addEventListener('click', () => {
    settingsModal.classList.add('hidden');
  });

  // 通过按下Esc键关闭设置面板
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !settingsModal.classList.contains('hidden')) {
      settingsModal.classList.add('hidden');
    }
  });

  // 主题切换
  themeToggleBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-theme');
    saveSettings(); // 保存设置到localStorage
  });

  // AI回答长度调整
  responseLengthSelect.addEventListener('change', (e) => {
    const length = e.target.value;
    const currentSession = sessions.find(session => session.id === currentSessionId);
    if (currentSession) {
      currentSession.settings.responseLength = length;
      saveSessions(); // 保存会话数据到localStorage
    }
  });

  // 模型温度调整
  temperatureSlider.addEventListener('input', (e) => {
    const temp = e.target.value;
    temperatureValue.textContent = temp;
    const currentSession = sessions.find(session => session.id === currentSessionId);
    if (currentSession) {
      currentSession.settings.temperature = parseFloat(temp);
      saveSessions(); // 保存会话数据到localStorage
    }
  });

  // 自动切换主题选项
  autoToggleCheckbox.addEventListener('change', (e) => {
    autoToggle = e.target.checked;
    localStorage.setItem('auto-toggle', autoToggle); // 保存选择到localStorage

    if (autoToggle) {
      // 根据系统偏好设置主题
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark-theme', prefersDark);
      localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
    }
  });


  function test(){
    setTimeout(() => {
      return 'tset'
    }, 3000)
  }
  console.log(test());
  