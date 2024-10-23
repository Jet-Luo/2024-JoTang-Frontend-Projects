document.addEventListener('DOMContentLoaded', function () {
  let hasAnimated = false; // 标志变量，防止多次触发文字动画
  window.addEventListener('scroll', function (e) {
    // 导航栏滚动效果 & 文字浮现效果
    const navbar = document.getElementById('navbar');
    const headline = document.querySelector('.headline');
    const headlineP = document.querySelectorAll('.headline .container p');
    const headlineSpan = document.querySelectorAll('.headline .container span');
    const headlineI = document.querySelectorAll('.headline .container span i');

    if (document.documentElement.scrollTop > 60 && !hasAnimated) {
      // 滚动后导航栏上移固定，内容浮现
      navbar.classList.add('scrolled');
      headline.style.marginTop = navbar.offsetHeight * 2 + 'px';
      // headline.style.marginTop = '0';
      // headline.style.cilpPath = `inset(${navbar.offsetHeight * 2 + 'px'} 0px 0px 0px)`;
      // 使内容浮现时才触发动画
      headlineP.forEach(p => p.classList.add('animate'));
      headlineSpan.forEach(span => span.classList.add('animate'));
      headlineI.forEach(i => i.classList.add('animate'));
      hasAnimated = true;
    } else if (document.documentElement.scrollTop <= 50 && hasAnimated) {
      // 导航栏复原
      navbar.classList.remove('scrolled');
      headline.style.marginTop = '100vh';
      // 重置动画，使得下一次仍能触发
      headlineP.forEach(p => p.classList.remove('animate'));
      headlineSpan.forEach(span => span.classList.remove('animate'));
      headlineI.forEach(i => i.classList.remove('animate'));
      hasAnimated = false;
    }

    // card

    // let scrolled = this.document.documentElement.scrollTop / (this.document.documentElement.scrollHeight - this.document.documentElement.clientHeight)
    // const firstSc = this.document.querySelector('.sticky-container .sc:first-child');
    // 下面的式子逻辑错误：当firstSc固定在顶部时，firstSc.getBoundingClientRect().top === 0
    // let scrolled = - (firstSc.getBoundingClientRect().top) / (this.document.documentElement.clientHeight * 4);
    // console.log(scrolled);
    console.log(this.document.documentElement.scrollTop);


    const workout = this.document.querySelector('.workout');
    const emotion = this.document.querySelector('.emotion');
    const literature = this.document.querySelector('.literature');
    // workout.style.clipPath = `inset(${(1 / 3 - scrolled) / (1 / 3) * 100}% 0px 0px 0px)`;
    // emotion.style.clipPath = `inset(${(2 / 3 - scrolled) / (1 / 3) * 100}% 0px 0px 0px)`;
    // literature.style.clipPath = `inset(${(1 - scrolled) / (1 / 3) * 100}% 0px 0px 0px)`; 
    // let top = 0;
    // if(firstSc.getBoundingClientRect().top === 0){
    //   top = this.document.documentElement.scrollTop;
    // }
    // console.log(top);
    
    const top = 1400 // 第一个sticky-container到页面顶部的距离，需确定好样式后手动输入
    const noStickyTop = top + document.documentElement.clientHeight * 3;
    if (document.documentElement.scrollTop > top) {
      workout.style.clipPath = `inset(${(1 - ((document.documentElement.scrollTop - top) / document.documentElement.clientHeight)) * 100}% 0px 0px 0px)`;

      emotion.style.clipPath = `inset(${(1 - ((document.documentElement.scrollTop - top - document.documentElement.clientHeight) / document.documentElement.clientHeight)) * 100}% 0px 0px 0px)`;

      literature.style.clipPath = `inset(${(1 - ((document.documentElement.scrollTop - top - document.documentElement.clientHeight * 2) / document.documentElement.clientHeight)) * 100}% 0px 0px 0px)`;

    }
    // 滚动结束后取消position: sticky，恢复margin
    if (document.documentElement.scrollTop >= noStickyTop) {
      this.document.querySelector('.sticky-container').classList.add('no-sticky');
    } else {
      this.document.querySelector('.sticky-container').classList.remove('no-sticky');
    }


  });
});

// swiper
var mySwiper = new Swiper('.swiper', {
  loop: true, // 循环模式选项
  autoplay: {
    delay: 3000,
  },
  // effect: 'fade',
  // fadeEffect: {
  //   crossFade: true
  // },

  // 分页器
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // 前进后退按钮
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // 滚动条
  scrollbar: {
    el: '.swiper-scrollbar',
  },
})

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
var option = {
  title: {
    text: 'Rapid Adoption'
  },
  tooltip: {},
  legend: {
    data: ['number of users']
  },
  xAxis: {
    data: ['2024.5', '2024.6', '2024.7', '2024.8', '2024.9', '2024.10']
  },
  yAxis: {},
  series: [
    {
      name: 'number of users',
      type: 'bar',
      data: [996, 1458, 2369, 5029, 7989, 8362]
    }
  ]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
