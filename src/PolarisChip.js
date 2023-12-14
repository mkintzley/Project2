import { LitElement, html, css } from 'lit-element';

class PolarisChip extends LitElement {
  static get properties() {
    return {
      link: { type: String},
      botdesc: { type: String},
      image: { type: String},
      title: { type: String},
      timestamp: {type: String},
      date: { type: String},
      month: { type: String },
      day: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {

      }
      .card-container {
        display: inline-block;
        align-items: top;
        text-align: left
        background-color: #fff;
        width: 400px;
        height: 400px;
        padding-left: 8px;
      }

      .images {
        background-color: #005fa9;
        height: 171px;
        width: 386px;
      }
      .images img:hover {
        opacity: 0.8;
      }
      .mid-wrapper {
        display: flex;
        padding-top: 15px;
        flex-direction: row;
      }
      .month-label .month{
        display: block;
        background: #1E407C;
        border-radius: 0 0 2px 2px;
        color: #FFF;
        text-transform: uppercase;
        font-size: 0.8em;
        font-weight: bold;
        line-height: 1.8;
      }
      .day-label .day{
          background: #f7f7f7;
          border-radius: 2px 2px 0 0;
          color: #444;
          display: block;
          font-size: 18px;
          font-weight: 900;
          padding: 10px 20px;
      }
      .title .desc{
          font-size: 1.3em;
          line-height: 1em;
          font-family: 'Roboto',sans-serif;
          text-transform: capitalize;
          color: #96BEE6;
            
      }
      .desc {
        font-family: 'Roboto',sans-serif;
      }
          a { color: #1E407C}
          a:focus { text-decoration: none; color:#001E44; }
          a:hover, a:active { text-decoration: none; color:#001E44 }
          a:visited { text-decoration: none; color:#1E407C; }
          a:hover { text-decoration: none; color:#001E44; }

          img { color: #1E407C}
          img:focus { text-decoration: none; color:#001E44; }
          img:hover, a:active { text-decoration: none; color:#001E44 }
          img:visited { text-decoration: none; color:#1E407C; }
          img:hover { text-decoration: none; color:#001E44; }
      
      .title .desc:hover{
        color: #1E407C;
      }
      
      .top-title {
        margin: 0 0 0 0;
        font-size: 1.5em;
        font-weight: 700;
        line-height: 3.6875rem;
        padding-bottom: 0px;
        position: left;
        text-align: left;
      
      @media screen and (max-width: 600px) {
        .card-container {
          display: inline-block;
        }
      }
    `;
  }
  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (["timestamp", "format", "unix"].includes(propName) && this.timestamp) {
        let stamp = this.timestamp;
        if (this.unix) {
          stamp = stamp * 1000;
        }
        this.month = new Date(stamp).toLocaleString('default', { month: 'long'}).substring(0, 3);
        this.day = new Date(stamp).getDate();
      }
    });
   }

  constructor() {
    super();
    this.image = '';
    this.title = '';
    this.link = " ";
    this.timestamp = '';
    this.title = ''; 
    this.date = 'null';
    this.month = '';
    this.day = '';
    this.botdesc = '';
  }

  render() {
    return html`
  
      <div class="card-container">
        <div class="wrapper">
        <div class="images">
          <a class="link" href="${this.link}">
            <img src="${this.image}" alt="picture :D" width="386" height="171">
          </a>
        </div>
        <div class="mid-wrapper">
          <div class="date-card">
            <div class="month-label">
              <label class="month"><slot>${this.month}</slot></label>
            </div>
            <div class="day-label">
              <label class="day"><slot>${this.day}</slot></label>
            </div>
          </div>
          <div class="title">
            <label class="desc"><a style="text-decoration:none" href="${this.link}"> <slot>${this.title}</slot></label></a>
          </div>
        </div>
        <div class="short-desc">
          <div property="schema:text" class="desc-text"></div>
          <p><slot>${this.botdesc}</slot></p>
        </div>
        </div>

      </div>
    `;
  }
}

customElements.define('polaris-chip', PolarisChip);