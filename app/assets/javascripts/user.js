$(document).on('turbolinks:load', function () {
  function  addUser(user){
    let html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
              </div>
              `
    $('#user-search-result').append(html)
  }
  function  addNoUser(){
    let html = `
               <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">ユーザーが見つかりません</p>
               </div>`
    $('#user-search-result').append(html)
  }
  function addDeleteUser(name, id) {
    let html = `
                <div class='chat-group-user clearfix" id="${id}'>
                  <input name='group[user_ids][]' type='hidden' value='${id}' id="group_user_ids_${id}"> 
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    $(".js-add-user").append(html);
  }
  $('#user-search-field').on('keyup', function () {
    let input = $('#user-search-field').val(); 
    $.ajax({
      url: '/users',
      type: 'GET',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function (users) {
      $('#user-search-result').empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          addUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        addNoUser();
      }
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    })
  })
  $(document).on('click', '.chat-group-user__btn--add', function () {
    const userName = $(this).attr('data-user-name');
    const userId = $(this).attr('data-user-id');
    $(this).parent().remove();
    addDeleteUser(userName, userId)
  });
  $(document).on('click', '.chat-group-user__btn--remove', function () {
    $(this).parent().remove();
  });
});