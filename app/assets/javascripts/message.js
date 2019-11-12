$(function () {
  function buildMessage(message) {
    let image = (message.image) ? `<img src=${message.image} >`:'';
    let html = `<div class='main__messages__box'>
                  <div class='main__messages__box__upper'>
                    <div class='main__messages__box__upper__user'>
                      ${message.user_name}
                    </div>
                    <div class='main__messages__box__upper__date'>
                      ${message.date}
                    </div>
                  </div>
                  <div class='main__messages__box__message'></div>
                    <p>
                      ${message.content}
                    </p>
                    ${image}
                  </div>`
    return html
  }
  $('#new_message').on('submit', function (e) {
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function (data) {
        let html = buildMessage(data);
        $('.main__messages').append(html);
        $(".main__messages").animate({ scrollTop: $('.main__messages')[0].scrollHeight });
        $('form')[0].reset();
        $('input').prop('disabled', false);
      })
      .fail(function () {
      alert('メッセージがありません')
    })
  })
});