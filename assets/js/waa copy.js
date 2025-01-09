
(function($) {
    'use strict';
    
    // 等待文档加载完成
    $(document).ready(function() {
        // 选择所有图片
        const images = $('img');
        
        // 为每个图片添加动画效果
        images.each(function() {
            let $img = $(this);
            let animationFrame;
            let startTime;
            
            function waveAnimation(currentTime) {
                if (!startTime) startTime = currentTime;
                const elapsed = currentTime - startTime;
                
                // 使用正弦函数创建波浪效果
                const verticalMove = Math.sin(elapsed * 0.3) * 5;
                const horizontalMove = Math.sin(elapsed * 0.5) * 3;
                
                // 应用变换，使用 jQuery 的 css 方法
                $img.css('transform', `translate(${horizontalMove}px, ${verticalMove}px)`);
                
                // 继续动画循环
                animationFrame = requestAnimationFrame(waveAnimation);
            }
            
            // 添加鼠标进入事件
            $img.on('mouseenter', function() {
                startTime = null;
                // 添加过渡效果
                $img.css('transition', 'transform 0.3s ease');
                animationFrame = requestAnimationFrame(waveAnimation);
            });
            
            // 添加鼠标离开事件
            $img.on('mouseleave', function() {
                cancelAnimationFrame(animationFrame);
                $img.css('transform', 'translate(0, 0)');
            });
        });
    });
})(jQuery);