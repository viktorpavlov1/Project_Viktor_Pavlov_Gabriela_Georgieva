/* globals $ requester toastr */

(function() {
    $('#btn-add-gallery-photo').on('click', () => {        
        let body = {
            url: $('#add-photo-url').val().trim(),
            title: $('#add-photo-title').val().trim(),
            category: $('#add-photo-category').val().trim()
        };

        for(let key in body) {
            if (!body[key] || body[key] === '') {
                toastr.error('Please, fill out all of the fields!');
                return;
            }
        }

        if (body.title.length < 3 || body.title.length > 20) {
            toastr.error('The title should be between 3 and 20 symbols!');
            return;
        }
        
        requester.postJSON('/add-photo', body)
            .then(() => {
                toastr.success('Photo sucessfully added!');
                setTimeout(() => { window.location = '/gallery'; }, 1000);
            })
            .catch(err => {
                console.log(err);
                toastr.error('An error occurred! Please try again!');
            });   
    });
}());