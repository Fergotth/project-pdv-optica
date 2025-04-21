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
                    animation: ZoomIn 0.5s;
                }

                @keyframes ZoomIn {
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
            </style>
        </div>
    </div>`;

const alerts = [
    {
        icon: "succes",
        timer: 4000,
        innerHTML: 
        `
        <div class="swal2-icon swal2-success">
            <div class="swal2-success-circular-line-left"></div>
            <span class="swal2-success-line-tip"></span>
            <span class="swal2-success-line-long"></span>
            <div class="swal2-success-ring"></div>
            <div class="swal2-success-fix"></div>
            <div class="swal2-success-circular-line-right"></div>
        </div>
        <div class="textTitleStyle"></div>
        <div class="textMessageStyle"></div>
        `,
        style: 
        `
        <style>
            .swal2-success {
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
            
            .swal2-success-line-tip,
            .swal2-success-line-long {
                position: absolute;
                height: 0.3125em;
                background-color: currentColor;
                border-radius: 0.125em;
            }
            
            .swal2-success-line-tip {
                top: 2.875em;
                left: 0.8125em;
                width: 1.5625em;
                transform: rotate(45deg);
            }
            
            .swal2-success-line-long {
                top: 2.375em;
                right: 0.5em;
                width: 2.9375em;
                transform: rotate(-45deg);
            }

            .swal2-icon.swal2-success {
                animation: swal2-animate-success-icon 0.5s;
            }

            @keyframes swal2-animate-success-icon {
                0% {
                    transform: rotateX(100deg);
                    opacity: 0;
                }
                100% {
                    transform: rotateX(0deg);
                    opacity: 1;
                }
            }

            .textTitleStyle {
                display: flex;
                width: 100%;
                align-item: center;
                text-align: center;
                justify-content: center;
                margin-top: 15px;
                font-size: 2.5rem;
            }

            .textMessageStyle {
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
        timer: 4000,
        innerHTML: 
        `
        <div class="swal2-icon swal2-question swal2-icon-show">
            <div class="swal2-question-circular-line-left"></div>
            <div class="swal2-question-circular-line-right"></div>
            <div class="swal2-question-ring"></div>
            <div class="swal2-icon-content">?</div>
        </div>
        <div class="textTitleStyle"></div>
        <div class="textMessageStyle"></div>
        `,
        style: 
        `
        <style>
            .swal2-icon.swal2-question {
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
            
            .swal2-icon .swal2-icon-content {
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

            .swal2-question-circular-line-left,
            .swal2-question-circular-line-right {
                content: "";
                border-radius: 50%;
                position: absolute;
                width: 5em;
                height: 5em;
                background: transparent;
                transform: rotate(-45deg);
                z-index: 1;
            }

            .swal2-question-circular-line-left {
                left: 0;
                top: 0;
            }
            
            .swal2-question-circular-line-right {
                right: 0;
                top: 0;
            }
            

            .swal2-icon.swal2-question.swal2-icon-show {
                animation: swal2-animate-error-icon 0.5s;
            }
            
            .swal2-icon.swal2-question.swal2-icon-show .swal2-icon-content {
                animation: swal2-animate-question-mark 0.8s;
                animation-delay: 0.5s;
            }

            .textTitleStyle {
                display: flex;
                width: 100%;
                align-item: center;
                text-align: center;
                justify-content: center;
                margin-top: 15px;
                font-size: 2.5rem;
            }

            .textMessageStyle {
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

            @keyframes swal2-animate-error-icon {
                0% {
                    transform: rotateX(100deg);
                    opacity: 0;
                }
                100% {
                    transform: rotateX(0deg);
                    opacity: 1;
                }
            }
            
            @keyframes swal2-animate-question-mark {
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
        timer: 4000,
        innerHTML: 
        `
        <div class="swal2-icon swal2-info swal2-icon-show">
            <div class="swal2-info-circular-line-left"></div>
            <div class="swal2-info-circular-line-right"></div>
            <div class="swal2-info-ring"></div>
            <div class="swal2-icon-content">!</div>
        </div>
        <div class="textTitleStyle"></div>
        <div class="textMessageStyle"></div>
        `,
        style: 
        `
        <style>
            .swal2-icon.swal2-info {
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
            
            .swal2-icon .swal2-icon-content {
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

            .swal2-info-circular-line-left,
            .swal2-info-circular-line-right {
                content: "";
                border-radius: 50%;
                position: absolute;
                width: 5em;
                height: 5em;
                background: transparent;
                transform: rotate(-45deg);
                z-index: 1;
            }

            .swal2-info-circular-line-left {
                left: 0;
                top: 0;
            }
            
            .swal2-info-circular-line-right {
                right: 0;
                top: 0;
            }
            

            .swal2-icon.swal2-info.swal2-icon-show {
                animation: swal2-animate-error-icon 0.5s;
            }
            
            .swal2-icon.swal2-info.swal2-icon-show .swal2-icon-content {
                animation: swal2-animate-info-mark 0.8s;
                animation-delay: 0.5s;
            }

            .textTitleStyle {
                display: flex;
                width: 100%;
                align-item: center;
                text-align: center;
                justify-content: center;
                margin-top: 15px;
                font-size: 2.5rem;
            }

            .textMessageStyle {
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

            @keyframes swal2-animate-error-icon {
                0% {
                    transform: rotateX(100deg);
                    opacity: 0;
                }
                100% {
                    transform: rotateX(0deg);
                    opacity: 1;
                }
            }
            
            @keyframes swal2-animate-info-mark {
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
        timer: 4000,
        innerHTML: 
        `
        <div class="swal2-icon swal2-error swal2-icon-show">
            <div class="swal2-error-circular-line-left"></div>
            <div class="swal2-error-circular-line-right"></div>
            <div class="swal2-error-ring"></div>
            <div class="swal2-icon-content">X</div>
        </div>
        <div class="textTitleStyle"></div>
        <div class="textMessageStyle"></div>
        `,
        style: 
        `
        <style>
            .swal2-icon.swal2-error {
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
            
            .swal2-icon .swal2-icon-content {
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

            .swal2-error-circular-line-left,
            .swal2-error-circular-line-right {
                content: "";
                border-radius: 50%;
                position: absolute;
                width: 5em;
                height: 5em;
                background: transparent;
                transform: rotate(-45deg);
                z-index: 1;
            }

            .swal2-error-circular-line-left {
                left: 0;
                top: 0;
            }
            
            .swal2-error-circular-line-right {
                right: 0;
                top: 0;
            }
            

            .swal2-icon.swal2-error.swal2-icon-show {
                animation: swal2-animate-error-icon 0.5s;
            }
            
            .swal2-icon.swal2-error.swal2-icon-show .swal2-icon-content {
                animation: swal2-animate-error-mark 0.8s;
                animation-delay: 0.5s;
            }

            .textTitleStyle {
                display: flex;
                width: 100%;
                align-item: center;
                text-align: center;
                justify-content: center;
                margin-top: 15px;
                font-size: 2.5rem;
            }

            .textMessageStyle {
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

            @keyframes swal2-animate-error-icon {
                0% {
                    transform: rotateX(100deg);
                    opacity: 0;
                }
                100% {
                    transform: rotateX(0deg);
                    opacity: 1;
                }
            }
            
            @keyframes swal2-animate-error-mark {
                0% {
                    transform: translate(-50%, -50%) rotateY(-360deg); /* Mantén el centro */
                }
                100% {
                    transform: translate(-50%, -50%) rotateY(0); /* Mantén el centro */
                }
            }
        </style>
        `
    }
];

export default alerts;