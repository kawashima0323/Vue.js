Vue.createApp({
    data() {
        return {
            money: 500, //初期金額
            charge: 0, //チャージ金額
            from: "", //出発駅
            to: "", //到着駅
            stationListFrom: [],
            stationListTo: [],
            station: [],
            path: 'https://www.izukyu.co.jp/assets/images/guide/suica/suica_normal.jpg'
        };
    },
    computed: {
        //money: function() { return this.money2 + this.charge },
    },
    //チャージ
    methods: {
        onclick() {
            this.money += this.charge;
        },
        //検索してものをクリックしたら反映される
        onclickFrom(stationFrom) {
            this.from = stationFrom;
            console.log(this.from);
        },
        onclickTo(stationTo) {
            console.log("クリックされました。");
            console.log(stationTo);
            this.to = stationTo;
            console.log(this.to);
        },

        onchangeFrom(e) {
            //URLに向けて通信する。t5
            this.stationListFrom = [];
            this.station = [];
            //検索した名前で絞っている
            axios.get("https://api.ekispert.jp/v1/json/station/light?key=test_pBj5M9pAwM6&type=train&nameMatchType=partial&name=" + this.from)
                .then(function(response) {
                    //通信に成功した時の処理
                    //responseの中に返ってきたオブジェクトが入ってる
                    cnt = 0;
                    response.data.ResultSet.Point.forEach(element => {
                        this.stationListFrom[cnt++] = element.Station.Name;
                        console.log(element.Station.Name)
                    });


                    console.log()
                }.bind(this))
                .catch(function(error) {
                    //エラーをキャッチした時。
                    console.log(error);
                })
                .finally(function() {
                    //ファイナリーです。
                });
        },
        onchangeTo(e) {
            //URLに向けて通信する。
            axios.get("https://api.ekispert.jp/v1/json/station/light?key=test_pBj5M9pAwM6&type=train&nameMatchType=partial&name=" + this.to)
                .then(function(response) {
                    //通信に成功した時の処理
                    //responseの中に返ってきたオブジェクトが入ってる。
                    cnt = 0;
                    response.data.ResultSet.Point.forEach(element => {
                        if (element.Station.Type == "train") {
                            this.stationListTo[cnt++] = element.Station.Name;
                        }
                    });
                }.bind(this))
                .catch(function(error) {
                    //エラーをキャッチした時。
                    console.log(error);
                })
                .finally(function() {
                    //ファイナリーです。
                });

        },

        searchFare(e) {

            axios.get("https://api.ekispert.jp/v1/json/station/light?key=test_pBj5M9pAwM6&type=train&nameMatchType=partial&viaList=" + this.from + ":" + this.to)
                .then(function(response) {
                    //通信に成功した時の処理
                    //responseの中に返ってきたオブジェクトが入ってる。
                    cnt = 0;

                    console.log(response);
                }.bind(this))
                .catch(function(error) {
                    //エラーをキャッチした時。
                    console.log(error);
                })
                .finally(function() {
                    //ファイナリーです。
                });

        },
        onmouseenter() {
            this.path = 'https://kfm.sakura.ne.jp/piceb/13nre/nresuicapenblbzoom.jpg';
        },
        onmouseleave() {
            this.path = 'https://www.izukyu.co.jp/assets/images/guide/suica/suica_normal.jpg';
        }
    }
}).mount('#app');