// 处理侧导航栏按钮逻辑
// 获取页面中所有的 .btn-toggle 元素
const buttons = document.querySelectorAll('.btn-toggle');
const sidebar = document.querySelector('.sidebar');
const content = document.querySelector('.content');
const topbar = document.querySelector('.topbar')

// 定义克隆按钮的类名
const CLONED_CLASS = 'cloned';

// 切换导航状态
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

// 添加克隆按钮
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
      if (window.innerWidth > 768 && !content.classList.contains('expanded')) {
        removeClonedButtons();
      }
    });
  }
}

// 删除克隆按钮
function removeClonedButtons() {
  const clonedBtns = topbar.querySelectorAll(`.btn-toggle.${CLONED_CLASS}`);
  clonedBtns.forEach(clonedBtn => clonedBtn.remove());
}

// 处理响应式逻辑
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
// 获取DOM元素 (真的太多了……每次都要找半天)
const newSessionBtn = document.querySelector('.btn-new-session');
const sessionList = document.querySelector('.session-list');
const messagesContainer = document.querySelector('.conversation');
const sendButton = document.querySelector('.send-button');
const userInput = document.querySelector('.user-input');

const openSettingsBtn = document.getElementById('open-settings');
const settingsModal = document.getElementById('settings-modal');
const closeSettingsBtn = document.querySelector('.close-button');
// const responseLengthSelect = document.getElementById('response-length');
// const temperatureSlider = document.getElementById('temperature');
// const temperatureValue = document.getElementById('temperature-value');
// const autoToggleCheckbox = document.getElementById('auto-toggle');
// 设置控件
const themeSwitcher = document.querySelector('.theme-switcher');
const responseLengthSwitcher = document.querySelector('.response-length-switcher');
const temperatureSwitcher = document.querySelector('.temperature-switcher');

const lightThemeRadio = document.getElementById('light-theme');
const darkThemeRadio = document.getElementById('dark-theme');
const autoThemeRadio = document.getElementById('auto-theme');

const shortResponseRadio = document.getElementById('short');
const mediumResponseRadio = document.getElementById('medium');
const longResponseRadio = document.getElementById('long');

const tempLowRadio = document.getElementById('temp-low');
const tempMediumRadio = document.getElementById('temp-medium');
const tempHighRadio = document.getElementById('temp-high');

const systemPromptTextarea = document.getElementById('system-prompt');
const saveSystemPromptBtn = document.getElementById('save-system-prompt');

// 应用状态
let sessions = [];             // 存储所有会话的数组
let currentSessionId = null;   // 当前选中的会话ID

// DeepSeek API配置
const API_KEY = 'sk-6c7870ebbfc444f582e0abb9ba10135c'; // API密钥
const API_URL = `https://api.deepseek.com/chat/completions`; // API端点

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
  loadSessions();        // 载入会话数据
  loadSettings();        // 载入用户设置
  renderSessionList();   // 渲染会话列表
  // 不自动加载对话
  // if (currentSessionId) {
  //   renderMessages();    // 渲染当前会话的消息
  // }
});

// 载入会话数据
function loadSessions() {
  const storedSessions = localStorage.getItem('sessions');
  if (storedSessions) {
    sessions = JSON.parse(storedSessions);
    // 不自动加载对话
    // if (sessions.length > 0) {
    //   currentSessionId = sessions[0].id;
    // }
  }
}

// 载入用户设置
function loadSettings() {
  const storedTheme = localStorage.getItem('theme');
  const storedResponseLength = localStorage.getItem('responseLength');
  const storedTemperature = localStorage.getItem('temperature');
  const storedSystemPrompt = localStorage.getItem('globalSystemPrompt'); // 修改为全局系统提示

  // 主题设置
  if (storedTheme) {
    if (storedTheme === 'light') {
      lightThemeRadio.checked = true;
      document.documentElement.classList.remove('dark-theme');
    } else if (storedTheme === 'dark') {
      darkThemeRadio.checked = true;
      document.documentElement.classList.add('dark-theme');
    } else if (storedTheme === 'auto') {
      autoThemeRadio.checked = true;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark-theme', prefersDark);
    }
  } else {
    // 默认选择Auto
    autoThemeRadio.checked = true;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark-theme', prefersDark);
    localStorage.setItem('theme', 'auto');
  }

  // AI回复长度设置
  if (storedResponseLength) {
    if (storedResponseLength === 512) {
      shortResponseRadio.checked = true;
    } else if (storedResponseLength === 1024) {
      mediumResponseRadio.checked = true;
    } else if (storedResponseLength === 2048) {
      longResponseRadio.checked = true;
    }
  } else {
    mediumResponseRadio.checked = true; // 默认值
  }

  // 模型温度设置
  if (storedTemperature) {
    if (storedTemperature === '0.0') {
      tempLowRadio.checked = true;
    } else if (storedTemperature === '1.0') {
      tempMediumRadio.checked = true;
    } else if (storedTemperature === '1.3') {
      tempHighRadio.checked = true;
    }
  } else {
    tempMediumRadio.checked = true; // 默认值
  }

  // 系统提示设置
  if (storedSystemPrompt) {
    systemPromptTextarea.value = storedSystemPrompt;
  } else {
    systemPromptTextarea.value = 'You are a helpful assistant.'; // 默认值
  }

  // 监听系统颜色偏好变化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (autoThemeRadio.checked) {
      document.documentElement.classList.toggle('dark-theme', e.matches);
      // 更新 localStorage 为 auto，确保持续
      localStorage.setItem('theme', 'auto');
    }
  });
}

// 保存会话数据
function saveSessions() {
  localStorage.setItem('sessions', JSON.stringify(sessions));
}

// 保存用户设置
function saveSettings(theme = null, responseLength = null, temperature = null, systemPrompt = null) {
  if (theme) {
    localStorage.setItem('theme', theme);
  }
  if (responseLength) {
    localStorage.setItem('responseLength', responseLength);
  }
  if (temperature) {
    localStorage.setItem('temperature', temperature);
  }
  if (systemPrompt !== null) {
    localStorage.setItem('globalSystemPrompt', systemPrompt); // 修改为全局系统提示
  }
}

// 渲染会话列表
function renderSessionList() {
  sessionList.innerHTML = ''; // 清空现有列表

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

    // 获取全局系统提示
    const globalSystemPrompt = localStorage.getItem('globalSystemPrompt') || 'You are a helpful assistant.';
    const systemPrompt = systemPromptTextarea.value.trim() || globalSystemPrompt;

    // 创建新会话对象
    const newSession = {
      id: generateSimpleID(), // 使用简化的ID生成函数
      name: sessionName,
      messages: [
        { role: 'system', content: systemPrompt }
      ],
      settings: {
        responseLength: getResponseLengthValue(getSelectedResponseLength()),
        temperature: parseFloat(getSelectedTemperature()),
      },
    };

    sessions.push(newSession);       // 添加到会话数组
    currentSessionId = newSession.id; // 设置为当前会话
    saveSessions();                  // 保存到localStorage
    renderSessionList();             // 重新渲染会话列表
    // renderMessages();                // 重新渲染消息窗口
  } else {
    alert('会话名称不能为空。');
  }
});

/**
 * 获取选中的AI回答长度值
 * @returns {string} - 选中的长度值（short, medium, long）
 */
function getSelectedResponseLength() {
  const selected = document.querySelector('.response-length-switcher input[name="response-length"]:checked');
  return selected ? selected.value : 'medium';
}

/**
 * 根据选择的AI回答长度返回对应的token数值
 * @param {string} length - 选择的长度选项（short, medium, long）
 * @returns {number} - 对应的token数值
 */
function getResponseLengthValue(length) {
  switch (length) {
    case 'short':
      return 1024;
    case 'medium':
      return 2048;
    case 'long':
      return 4096;
    default:
      return 2048;
  }
}

/**
 * 获取选中的模型温度值
 * @returns {string} - 选中的温度值（0.0, 1.0, 1.3）
 */
function getSelectedTemperature() {
  const selected = document.querySelector('.temperature-switcher input[name="temperature"]:checked');
  return selected ? selected.value : '1.0';
}

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
    currentSessionId = null; // 不切换到其他会话

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
      messageDiv.classList.add('message', msg.role); // 添加类名区分用户和AI
      messageDiv.innerHTML = marked.parse(msg.content); // Markdown 转 HTML
      if (messageDiv.classList.contains('system')) {
        messageDiv.remove(); // 不显示system的话
      } else {
        messagesContainer.appendChild(messageDiv);
      }
    });
    // 自动滚动到底部
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
    timer = setInterval(dataShow, 2000) // 轮播字
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
  if (text === '') return; // 如果输入为空，退出

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
    // 自动创建新会话对象
    const newSession = {
      id: generateSimpleID(), // 使用简化的ID生成函数
      name: sessionName,
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' }
      ],
      settings: {
        responseLength: getResponseLengthValue(getSelectedResponseLength()),
        temperature: parseFloat(getSelectedTemperature()),
      },
    };

    sessions.push(newSession);        // 添加到会话数组
    currentSessionId = newSession.id; // 设置为当前会话
    saveSessions();                   // 保存到localStorage

    renderSessionList();              // 重新渲染会话列表
    // renderMessages();                 // 重新渲染消息窗口
  }

  const currentSession = sessions.find(session => session.id === currentSessionId);
  if (currentSession) {
    const userMessage = { role: 'user', content: text, timestamp: Date.now() };
    currentSession.messages.push(userMessage); // 添加用户消息
    saveSessions();                           // 保存会话数据
    renderMessages();                         // 重新渲染消息
    userInput.value = '';                     // 清空输入框

    // 模拟AI回复
    // simulateAIResponse(currentSession);
    // 发送请求到DeepSeek获取AI回复
    getAIResponse(currentSession);
  }
}

/**
 * 获取AI回复
 * 通过向API发送用户消息，获取AI的回复并添加到会话中
 * @param {Object} session - 当前会话对象
 */
async function getAIResponse(session) {
  // 显示加载状态
  const loadingMessage = { role: 'assistant', content: 'JT GPT Responding...', timestamp: Date.now() };
  session.messages.push(loadingMessage);
  saveSessions();
  renderMessages();
  // 移除加载消息
  session.messages.pop();

  try {
    const response = await fetch(API_URL, { // API端点
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`, // API密钥
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "messages": session.messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        "model": "deepseek-chat",
        "temperature": session.settings.temperature || 1,
        "max_tokens": session.settings.responseLength || 2048,
        "top_p": 1,
        // 其他可选值
        // "frequency_penalty": 0,
        // "presence_penalty": 0,
        // "response_format": {
        //   "type": "text"
        // },
        // "stop": null,
        // "stream": false,
        // "stream_options": null,
        // "tools": null,
        // "tool_choice": "none",
        // "logprobs": false,
        // "top_logprobs": null
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error details:', errorData);
      throw new Error(`HTTP error! Status: ${response.status} - ${errorData.error || 'Unknown error'}`);
    }

    const data = await response.json();

    // 添加AI的回复
    const aiReply = data.choices[0].message.content || '抱歉，我无法生成回复。';
    session.messages.push({ role: 'assistant', content: aiReply, timestamp: Date.now() });
    saveSessions();
    renderMessages();
  } catch (error) {
    console.error('Error fetching JT GPT response:', error);
    // 添加错误消息
    session.messages.push({ role: 'assistant', content: '抱歉，JT GPT 回复失败。请稍后再试。', timestamp: Date.now() });
    saveSessions();
    renderMessages();
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
themeSwitcher.querySelectorAll('input[name="themes"]').forEach((input) => {
  input.addEventListener('change', (e) => {
    if (e.target.id === 'light-theme') {
      document.documentElement.classList.remove('dark-theme');
      saveSettings('light', null, null);
    } else if (e.target.id === 'dark-theme') {
      document.documentElement.classList.add('dark-theme');
      saveSettings('dark', null, null);
    } else if (e.target.id === 'auto-theme') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark-theme', prefersDark);
      saveSettings('auto', null, null);
    }
  });
});


// AI回答长度调整
responseLengthSwitcher.querySelectorAll('input[name="response-length"]').forEach((input) => {
  input.addEventListener('change', (e) => {
    const length = parseInt(e.target.value, 10);
    const currentSession = sessions.find(session => session.id === currentSessionId);
    if (currentSession) {
      currentSession.settings.responseLength = getResponseLengthValue(e.target.value);
      saveSettings(null, currentSession.settings.responseLength, null);
      saveSessions(); // 保存会话数据到localStorage
    }
  });
});

// 模型温度调整
temperatureSwitcher.querySelectorAll('input[name="temperature"]').forEach((input) => {
  input.addEventListener('change', (e) => {
    const temp = parseFloat(e.target.value);
    const currentSession = sessions.find(session => session.id === currentSessionId);
    if (currentSession) {
      currentSession.settings.temperature = temp;
      saveSettings(null, null, currentSession.settings.temperature);
      saveSessions(); // 保存会话数据到localStorage
    }
  });
});

// system prompt 编辑与保存
saveSystemPromptBtn.addEventListener('click', () => {
  const newSystemPrompt = systemPromptTextarea.value.trim();
  if (newSystemPrompt === '') {
    alert('系统提示不能为空。');
    return;
  }

  // 更新全局系统提示
  saveSettings(null, null, null, newSystemPrompt); // 保存全局系统提示到localStorage

  // 对于新创建的会话，将会自动使用新的系统提示
  // 现有会话保持不变，不进行任何操作

  alert('全局系统提示已更新。新创建的会话将使用此提示。');
});