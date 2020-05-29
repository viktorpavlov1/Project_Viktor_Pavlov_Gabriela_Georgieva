/* globals $ requester toastr */

(function() {
    $('#btn-add-story').on('click', () => {
        let body = {
            title: $('#add-story-title').val().trim(),
            body: $('#add-story-body').val().trim(),
            picture: $('#add-photo-title').val().trim(),
            category: $('#add-story-category').val().trim()
        };

        for(let key in body) {
            if (!body[key] || body[key] === '') {
                toastr.error('Please, fill out all of the fields!');
                return;
            }
        }

        if (body.title.length < 3 || body.title.length > 50) {
            toastr.error('The title should be between 3 and 50 symbols!');
            $('#add-story-body').focus();
            return;
        }
        
        if (body.body.length < 50 || body.title.length > 2000) {
            toastr.error('The story should be between 50 and 2000 symbols!');
            $('#add-story-title').focus();
            return;
        }

        requester.postJSON('/add-story', body)
            .then(() => {
                toastr.success('Story sucessfully added!');
                setTimeout(() => { window.location = '/stories'; }, 1000);
            })
            .catch(err => {
                console.log(err);
                toastr.error('An error occurred! Please try again!');
            });  
    });
}());