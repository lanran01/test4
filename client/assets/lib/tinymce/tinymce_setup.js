function initEditor() {
  tinymce.init({

    selector: 'textarea',
  
    directionality: 'ltr',

    height: 300,
    statusbar: false,
    width: '100%',
  
    plugins: [
      'advlist autolink link image lists charmap preview hr anchor pagebreak spellchecker',
      'searchreplace wordcount visualblocks visualchars code insertdatetime nonbreaking',
      'save table contextmenu directionality template paste textcolor',
      'codesample imageupload'
    ],
   
    toolbar:
      'insertfile undo redo | \
       styleselect | \
       bold italic | \
       alignleft aligncenter alignright alignjustify | \
       bullist numlist outdent indent | \
       image | \
       preview | \
       forecolor emoticons |\
       codesample fontsizeselect |\
       imageupload',
    
    fontsize_formats: '10pt 12pt 14pt 18pt 24pt 36pt',
   
    nonbreaking_force_tab: true
    //   imageupload_url: '/user/submit-image'
  })
}
