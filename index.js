const form = document.querySelector('form');
fileinput = document.getElementById('file-input');
let progress_area = document.querySelector('.progress-area')
let uploaded_area = document.querySelector('.uploaded-area')



form.onclick = () => {
    fileinput.click();
}
fileinput.onchange = ({ target }) => {
    // getting file and [0] means first file only if multiple selected
    let file = target.files[0];
    if (file) {
        if (file.name.length > 10) {
            let splitname = file.name.split('.')
            filename = splitname[0].slice(0, 8) + ' ' + splitname[1]
            uploadfile(filename);
            //  calling function by passing filename as argument
        }
    }


}

let uploadfile = (name) => {
    let xhr = new XMLHttpRequest();



    xhr.open('POST', 'php/upload.php') //sending post request to the specified URL/file 
    xhr.upload.onprogress = ({ loaded, total }) => {
        let fileloaded = Math.floor((loaded / total) * 100)  //getting size in percentage 
        let filetotal = Math.floor(total / 1000)  // getting filesize in kb from bytes

        // if filesize is less than 1024 add kb else convert to mb
        if (filetotal < 1024) {
            filesize = `${filetotal}KB`
        }
        else {
            filesize = `${(loaded / 1024 * 1024).toFixed(2)}MB`
        }
        let progressHTML = `
                <li class="row">
                <i class="bi bi-file-earmark-bar-graph-fill"></i>

                <div class="content">
                    <div class="details">
                        <span class="name">${name}. Uploading</span>
                        <span class="percent">${fileloaded}%</span>
                    </div>
                    <div class="progress-bar">
                    
                        <div class="progress" style="width:${fileloaded};">
                            
                        </div>
                    </div>
                </div>

            </li>`;
        progress_area.innerHTML = progressHTML;
        if (loaded == total) {
            progress_area.innerHTML = ''
            let uploadhtml = ` <li class="row">
   <div class="content">
       <i class="bi bi-file-earmark-bar-graph-fill"></i>
       <div class="details">
           <span class="name">${name} . Uploaded</span>
           <span class="size">${filesize}</span>
       </div>
   </div>

   <i class="bi bi-check-lg"></i>
</li>`;

            uploaded_area.innerHTML = uploadhtml;
        }
    }

    let formdata = new FormData(form); // used to send form data

    xhr.send(formdata); // sending form data to php

}










