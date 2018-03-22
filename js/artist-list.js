// 초기화시 실행할 내용들
var pageNum = 1;
getArtists(pageNum);

// 더 보기 버튼을 눌렀을 때 동작
$('#btnMoreArtists').click(function () {
  clickMoreArtistsButton();
});
function clickMoreArtistsButton () {
  pageNum += 1;
  getArtists(pageNum);
}

function getArtists (pageNum) {
  axios({
    url: 'http://localhost:8000/api/artist/',
    method: 'get',
    params: {
      page: pageNum,
    }
  }).then(function (response) {
      console.log(response.data);
      // ul.artist-list
      var artistListElement = $('.artist-list');
      // 응답의 Artist 정보 목록
      var artists = response.data.results;
      // Aritst정보 목록을 순회
      for (var i = 0; i < artists.length; i++) {
        // 현재 Artist정보
        var curArtist = artists[i];
        // 현재 Artist정보를 담을 li.artist-item요소를 복사
        var curArtistItemElement = $('#artist-item-template').clone();
        // 복사한 아이템에서 .artist-name에 해당하는 속성의 text를 curArtist의 name값으로 설정
        curArtistItemElement.find('.artist-name').text(curArtist.name);
        curArtistItemElement.find('.artist-img-profile').attr('src', curArtist.img_profile);
        // ul.artist-list에 복사한 li.artist-item요소를 가장 뒤에 삽입
        artistListElement.append(curArtistItemElement);
      }
      // response.data.next가 null일 경우
      // #btnMoreArtists의 display속성을 none으로 지정
      if (response.data.next == null) {
        $('#btnMoreArtists').css('display', 'none');
      }

    })
    .catch(function (error) {
      console.log(error);
    });
}
