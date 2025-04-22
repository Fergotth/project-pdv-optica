export const container = `
    <div class="overlay" style="height: 100vh; width: 100vw; background-color: #00000022; position: absolute;">    
        <div class="containerAlert">
            <style>
                .containerAlert {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 40vw;
                    border-radius: 15px;
                    background: #fff;
                    animation: fadeIn 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards, fadeOut 0.5s ease 3.4s forwards;
                }

                @keyframes fadeIn {
                    0% {
                        transform: translate(-50%, -50%) scale(0);
                    }
                    70% {
                        transform: translate(-50%, -50%) scale(1.0);
                    } 
                    80% {
                        transform: translate(-50%, -50%) scale(0.9);
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(1.0);
                    }
                }

                @keyframes fadeOut {
                    0% {
                        transform: translate(-50%, -50%) scale(1.0);
                    }
                    70% {
                        transform: translate(-50%, -50%) scale(0.9);
                    } 
                    80% {
                        transform: translate(-50%, -50%) scale(1.0);
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(0);
                    }
                }
            </style>
        </div>
    </div>`;

const alerts = [
    {
        icon: "success",
        innerHTML: 
        `
        <div class="icon success">
            <div class="success-circular-line-left"></div>
            <span class="success-line-tip"></span>
            <span class="success-line-long"></span>
            <div class="success-ring"></div>
            <div class="success-fix"></div>
            <div class="success-circular-line-right"></div>
        </div>
        <div class="textTitle"></div>
        <div class="textMessage"></div>
        `,
        style: 
        `
        <style>
            .success {
                border-color: #a5dc86;
                color: #a5dc86;
                background: #fff;
                position: relative;
                left: calc(50% - 2.5em);
                margin-top: 5%;
                width: 5em;
                height: 5em;
                border-radius: 50%;
                border: 0.25em solid;
                box-sizing: content-box;
            }
            
            .success-line-tip,
            .success-line-long {
                position: absolute;
                height: 0.3125em;
                background-color: currentColor;
                border-radius: 0.125em;
            }
            
            .success-line-tip {
                top: 2.875em;
                left: 0.8125em;
                width: 1.5625em;
                transform: rotate(45deg);
            }
            
            .success-line-long {
                top: 2.375em;
                right: 0.5em;
                width: 2.9375em;
                transform: rotate(-45deg);
            }

            .icon.success {
                animation: animate-success-icon 0.5s;
            }

            @keyframes animate-success-icon {
                0% {
                    transform: rotateX(100deg);
                    opacity: 0;
                }
                100% {
                    transform: rotateX(0deg);
                    opacity: 1;
                }
            }

            .textTitle {
                display: flex;
                width: 100%;
                align-item: center;
                text-align: center;
                justify-content: center;
                margin-top: 15px;
                font-size: 2.5rem;
            }

            .textMessage {
                display: flex;
                width: 100%;
                align-item: center;
                text-align: center;
                justify-content: center;
                margin-top: 15px;
                margin-bottom: 15px;
                font-size: 1rem;
                color: #888;
            }
        </style>
        `
    },
    {
        icon: "question",
        innerHTML: 
        `
        <div class="icon question icon-show">
            <div class="question-circular-line-left"></div>
            <div class="question-circular-line-right"></div>
            <div class="question-ring"></div>
            <div class="icon-content">?</div>
        </div>
        <div class="textTitle"></div>
        <div class="textMessage"></div>
        `,
        style: 
        `
        <style>
            .icon.question {
                border-color: #87adbd;
                color: #87adbd;
                position: relative;
                left: calc(50% - 2.5em);
                margin-top: 5%;
                width: 5em;
                height: 5em;
                border-radius: 50%;
                border: 0.25em solid;
                box-sizing: content-box;
            }
            
            .icon .icon-content {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3.75em;
                line-height: 1;
                z-index: 2;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            .question-circular-line-left,
            .question-circular-line-right {
                content: "";
                border-radius: 50%;
                position: absolute;
                width: 5em;
                height: 5em;
                background: transparent;
                transform: rotate(-45deg);
                z-index: 1;
            }

            .question-circular-line-left {
                left: 0;
                top: 0;
            }
            
            .question-circular-line-right {
                right: 0;
                top: 0;
            }
            

            .icon.question.icon-show {
                animation: animate-error-icon 0.5s;
            }
            
            .icon.question.icon-show .icon-content {
                animation: animate-question-mark 0.8s;
                animation-delay: 0.5s;
            }

            .textTitle {
                display: flex;
                width: 100%;
                align-item: center;
                text-align: center;
                justify-content: center;
                margin-top: 15px;
                font-size: 2.5rem;
            }

            .textMessage {
                display: flex;
                width: 100%;
                align-item: center;
                text-align: center;
                justify-content: center;
                margin-top: 15px;
                margin-bottom: 15px;
                font-size: 1rem;
                color: #888;
            }

            @keyframes animate-error-icon {
                0% {
                    transform: rotateX(100deg);
                    opacity: 0;
                }
                100% {
                    transform: rotateX(0deg);
                    opacity: 1;
                }
            }
            
            @keyframes animate-question-mark {
                0% {
                    transform: translate(-50%, -50%) rotateY(-360deg); /* Mantén el centro */
                }
                100% {
                    transform: translate(-50%, -50%) rotateY(0); /* Mantén el centro */
                }
            }
        </style>
        `
    },
    {
        icon: "info",
        innerHTML: 
        `
        <div class="icon info icon-show">
            <div class="info-circular-line-left"></div>
            <div class="info-circular-line-right"></div>
            <div class="info-ring"></div>
            <div class="icon-content">!</div>
        </div>
        <div class="textTitle"></div>
        <div class="textMessage"></div>
        `,
        style: 
        `
        <style>
            .icon.info {
                border-color: #87adbd;
                color: #87adbd;
                position: relative;
                left: calc(50% - 2.5em);
                margin-top: 5%;
                width: 5em;
                height: 5em;
                border-radius: 50%;
                border: 0.25em solid;
                box-sizing: content-box;
            }
            
            .icon .icon-content {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3.75em;
                line-height: 1;
                z-index: 2;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            .info-circular-line-left,
            .info-circular-line-right {
                content: "";
                border-radius: 50%;
                position: absolute;
                width: 5em;
                height: 5em;
                background: transparent;
                transform: rotate(-45deg);
                z-index: 1;
            }

            .info-circular-line-left {
                left: 0;
                top: 0;
            }
            
            .info-circular-line-right {
                right: 0;
                top: 0;
            }
            

            .icon.info.icon-show {
                animation: animate-error-icon 0.5s;
            }
            
            .icon.info.icon-show .icon-content {
                animation: animate-info-mark 0.8s;
                animation-delay: 0.5s;
            }

            .textTitle {
                display: flex;
                width: 100%;
                align-item: center;
                text-align: center;
                justify-content: center;
                margin-top: 15px;
                font-size: 2.5rem;
            }

            .textMessage {
                display: flex;
                width: 100%;
                align-item: center;
                text-align: center;
                justify-content: center;
                margin-top: 15px;
                margin-bottom: 15px;
                font-size: 1rem;
                color: #888;
            }

            @keyframes animate-error-icon {
                0% {
                    transform: rotateX(100deg);
                    opacity: 0;
                }
                100% {
                    transform: rotateX(0deg);
                    opacity: 1;
                }
            }
            
            @keyframes animate-info-mark {
                0% {
                    transform: translate(-50%, -50%) rotateY(-360deg); /* Mantén el centro */
                }
                100% {
                    transform: translate(-50%, -50%) rotateY(0); /* Mantén el centro */
                }
            }
        </style>
        `
    },
    {
        icon: "error",
        innerHTML: 
        `
        <div class="icon error icon-show">
            <div class="error-circular-line-left"></div>
            <div class="error-circular-line-right"></div>
            <div class="error-ring"></div>
            <div class="icon-content">X</div>
        </div>
        <div class="textTitle"></div>
        <div class="textMessage"></div>
        `,
        style: 
        `
        <style>
            .icon.error {
                border-color: #ff0000;
                color: #ff0000;
                position: relative;
                left: calc(50% - 2.5em);
                margin-top: 5%;
                width: 5em;
                height: 5em;
                border-radius: 50%;
                border: 0.25em solid;
                box-sizing: content-box;
            }
            
            .icon .icon-content {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3.75em;
                line-height: 1;
                z-index: 2;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            .error-circular-line-left,
            .error-circular-line-right {
                content: "";
                border-radius: 50%;
                position: absolute;
                width: 5em;
                height: 5em;
                background: transparent;
                transform: rotate(-45deg);
                z-index: 1;
            }

            .error-circular-line-left {
                left: 0;
                top: 0;
            }
            
            .error-circular-line-right {
                right: 0;
                top: 0;
            }
            

            .icon.error.icon-show {
                animation: animate-error-icon 0.5s;
            }
            
            .icon.error.icon-show .icon-content {
                animation: animate-error-mark 0.8s;
                animation-delay: 0.5s;
            }

            .textTitle {
                display: flex;
                width: 100%;
                align-item: center;
                text-align: center;
                justify-content: center;
                margin-top: 15px;
                font-size: 2.5rem;
            }

            .textMessage {
                display: flex;
                width: 100%;
                align-item: center;
                text-align: center;
                justify-content: center;
                margin-top: 15px;
                margin-bottom: 15px;
                font-size: 1rem;
                color: #888;
            }

            @keyframes animate-error-icon {
                0% {
                    transform: rotateX(100deg);
                    opacity: 0;
                }
                100% {
                    transform: rotateX(0deg);
                    opacity: 1;
                }
            }
            
            @keyframes animate-error-mark {
                0% {
                    transform: translate(-50%, -50%) rotateY(-360deg); /* Mantén el centro */
                }
                100% {
                    transform: translate(-50%, -50%) rotateY(0); /* Mantén el centro */
                }
            }
        </style>
        `
    },
    {
        innerHTML: 
        `
        <div class="textTitle"></div>
        <div class="textMessage"></div>
        `,
        style: 
        `
        .textTitle {
            display: flex;
            width: 100%;
            align-item: center;
            text-align: center;
            justify-content: center;
            margin-top: 15px;
            font-size: 2.5rem;
        }

        .textMessage {
            display: flex;
            width: 100%;
            align-item: center;
            text-align: center;
            justify-content: center;
            margin-top: 15px;
            margin-bottom: 15px;
            font-size: 1rem;
            color: #888;
        }
        `
    }
];

export default alerts;