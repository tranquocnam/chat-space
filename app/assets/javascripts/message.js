$(function () {
  
  function buildMessage(message) {
    let image = (message.image) ? `<img src=${message.image} >` : '';
    let html = `<div class="main__messages__box" data-message-id="${message.id}">
                  <div class="main__messages__box__upper">
                    <p class="main__messages__box__upper__user">${message.user_name}</p>
                    <p class="main__messages__box__upper__date">${message.date}</p>
                  </div>
                  <p class="main__messages__box__message">${message.content}</p>
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
      });
  });
  let reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      let last_message_id = $('.main__messages__box:last').data('message-id');
    
      $.ajax({
        url: 'api/messages',
        type: 'GET',
        dataType: 'json',
        data: { id: last_message_id }
      })
        .done(function (messages) {
          let insertHTML = '';
          messages.forEach(function (message) {
            insertHTML = buildMessage(message)
            $('.main__messages').append(insertHTML);
            $('.main__messages').animate({ scrollTop: $('.main__messages')[0].scrollHeight });
          })
        })
        .fail(function () {
          alert('自動更新に失敗しました');
        });
    };
  };
    setInterval(reloadMessages, 7000);
});