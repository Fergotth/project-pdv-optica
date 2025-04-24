export const container = `
    <div class="overlay" style="height: 100vh; width: 100vw; background-color: #00000022; position: absolute;">    
        <div class="containerAlert"></div>
    </div>`;

export const alerts = [
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
        `
    },
    {
        innerHTML: 
        `
        <div class="textTitle"></div>
        <div class="textMessage"></div>
        `
    }
];