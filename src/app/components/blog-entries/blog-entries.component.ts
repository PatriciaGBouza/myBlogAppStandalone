import { formatDate } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-blog-entries',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './blog-entries.component.html',
  styleUrl: './blog-entries.component.css',
  encapsulation: ViewEncapsulation.None
})


export class BlogEntriesComponent {
  entriesJSON: string="";
  newEntry:iEntry = {
    'title':"",
    'imageUrl':"",
    'text':"",
    'date': "",
    'errorMessages':""
  }
  
  constructor(){
    this.entriesJSON='{"entries":[{"title":" Semper auctor neque vitae tempus quam pellentesque nec", "imageURL":"https://placehold.co/200x200", "text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "date":"Feb 4, 2024, 12:30:22 AM"},{"title":"Tempor id eu nisl nunc mi ipsum faucibus vitae", "imageURL":"https://placehold.co/100x100", "text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et egestas quis ipsum suspendisse ultrices. Aenean et tortor at risus viverra adipiscing at in. Neque gravida in fermentum et sollicitudin ac orci phasellus. Purus in massa tempor nec feugiat nisl pretium. Ipsum a arcu cursus vitae. In eu mi bibendum neque egestas congue quisque. Faucibus a pellentesque sit amet porttitor eget dolor morbi. Quis varius quam quisque id diam. Ac tortor vitae purus faucibus ornare suspendisse sed nisi. A iaculis at erat pellentesque adipiscing. Nunc mattis enim ut tellus elementum sagittis vitae. Turpis egestas maecenas pharetra convallis posuere morbi. Massa ultricies mi quis hendrerit. In tellus integer feugiat scelerisque varius morbi enim nunc faucibus. Tortor aliquam nulla facilisi cras fermentum.", "date":"Feb 4, 2024, 11:30:52 AM"}]}'
  }

  validate(entry:iEntry):boolean{
    let fieldsWithError:string[]= new Array();
    if (entry.title !=null && entry.title.trim().length==0){
      fieldsWithError.push(" Title");
    }
    if (entry.imageUrl !=null && entry.imageUrl.trim().length==0){
      fieldsWithError.push(" Image URL");
    }
    if (entry.text !=null && entry.text.trim().length==0){
      fieldsWithError.push(" Text");
    }
    

    if (fieldsWithError.length>0){
      entry.errorMessages="Next field(s) are empty: "+fieldsWithError.toString()+". Please, enter a value.";
      return false;
    }
    return true;

      
    return true;
  }

  publishEntry(){

    if(this.validate(this.newEntry)){
      let entriesObj=JSON.parse(this.entriesJSON);
      this.newEntry.date=formatDate(Date.now(),'medium','en-US')
      entriesObj.entries.unshift(this.newEntry);
      this.entriesJSON=JSON.stringify(entriesObj);
    
    this.newEntry={
      'title':"",
      'imageUrl':"",
      'text':"",
      'date': "",
      'errorMessages':""
    }
  } 
  }

  
  showData(): string{
    let html: string="";
    let entriesObj=JSON.parse(this.entriesJSON);
    let entries: any[]=entriesObj.entries;
    for (const x in entries) {
        html+="<div class=\"blog-box\">";
        let titleHtml="<div class=\"blog-box-title\">"+ entries[x].title + "</div>";
        let imageHtml="<div class=\"blog-box-img\"><img src=\""+ entries[x].imageURL + "\" ></div>";
        let textHtml="<div class=\"blog-box-text\">"+ entries[x].text + "<p>"+ entries[x].date + "</p></div>";
       
        html += imageHtml+titleHtml+textHtml+"</div>";
      }

    return html;          

  }

}

interface iEntry{
  title:string;
  imageUrl:string;
  text:string;
  date:string;
  errorMessages:string;
}
