// codigo para las alertas


const icons = [
    {
        className1: "swal2-icon",
        className2: "swal2-success",
        className3: "",
        icon: "succes",
        iconHTML: `
            <div class="swal2-success-circular-line-left"></div>
            <span class="swal2-success-line-tip"></span>
            <span class="swal2-success-line-long"></span>
            <div class="swal2-success-ring"></div>
            <div class="swal2-success-fix"></div>
            <div class="swal2-success-circular-line-right"></div>
        `,
        style: `
        .swal2-success {
            border-color: #a5dc86;
            color: #a5dc86;
            position: relative;
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
        `
    },
    {
        className1: "swal2-icon",
        className2: "swal2-question",
        className3: "swal2-icon-show",
        icon: "question",
        iconHTML: `
        <div class="swal2-question-circular-line-left"></div>
        <div class="swal2-question-circular-line-right"></div>
        <div class="swal2-question-ring"></div>
        <div class="swal2-icon-content">?</div>
        `,
        style: `
        .swal2-icon.swal2-question {
            border-color: #87adbd;
            color: #87adbd;
        }
        
        .swal2-icon .swal2-icon-content {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3.75em;
            line-height: 1;
        }

        .swal2-question-circular-line-left,
        .swal2-question-circular-line-right {
            content: "";
            border-radius: 50%;
            position: absolute;
            width: 5em;
            height: 5em;
            background: white;
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
        
        .swal2-question-ring {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 0.25em solid #87adbd;
            border-radius: 50%;
            box-sizing: content-box;
            z-index: 0;
        }

        .swal2-icon.swal2-question.swal2-icon-show {
            animation: swal2-animate-error-icon 0.5s;
        }
        
        .swal2-icon.swal2-question.swal2-icon-show .swal2-icon-content {
            animation: swal2-animate-question-mark 0.8s;
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
                transform: rotateY(-360deg);
            }
            100% {
                transform: rotateY(0);
            }
        }
        `
    }
]
const x = document.getElementById('x');

x.addEventListener('click', () => {
    let a = document.createElement('div');
    a.classList.add(icons[1].className1);
    a.classList.add(icons[1].className2);
    a.classList.add("swal2-icon-show");
    a.innerHTML = icons[1].iconHTML;
    document.body.appendChild(a);
});

const styleTag = document.createElement('style');
styleTag.innerHTML = icons[1].style;
document.head.appendChild(styleTag);
