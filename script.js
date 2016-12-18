$(document).ready(function(){

			var Images = {
				img1 : {
					pic: 'img/1.jpg',
					desc1: 'Bugatti Chiron',
					desc2: 'Построен, чтобы сломить законы физики.'
				},

				img2 : {
					pic: 'img/2.jpg',
					desc1: 'Chevrolet Camaro',
					desc2: 'Культовый американец-трансформер.'
				},

				img4 : {
					pic: 'img/3.jpg',
					desc1: 'Hummer H3',
					desc2: 'Серьезный автомобиль для серьезных мужчин.'
				},

				img3 : {
					pic: 'img/4.jpg',
					desc1: 'Lamborghini Huracan',
					desc2: 'Итальянский дизайн, непревзойденная маневренность.'
				},

				img6 : {
					pic: 'img/5.jpg',
					desc1: 'McLaren P1',
					desc2: 'Есть чему поучиться у англичан.'
				},

				img5 : {
					pic: 'img/7.jpg',
					desc1: 'Bmw 750 li',
					desc2: 'Стильный и брутальный немец.'
				},

				img7 : {
					pic: 'img/11.jpg',
					desc1: 'Bentley Continental',
					desc2: 'Роскошь аристократов.'
				},

				img8 : {
					pic: 'img/12.jpg',
					desc1: 'Ferrari Spyder 458',
					desc2: 'Желанный автомобиль с горячим темпераментом.'
				},

				img9 : {
					pic: 'img/10.jpg',
					desc1: 'Koenigsegg Agera r',
					desc2: 'Шведский гиперкар. Скорость 420 км/ч.'
				},

			}

            //Add new slider points depends of picture's number

			function n_width(){			
			    element = document.getElementById('buttons');
                var old_w = window.getComputedStyle(element).width;
			    var w = Number(old_w.substr(0, old_w.length - 2));
			    return w;
			};
            
			var numb = Object.keys(Images).length;
            var id_n = 0;

			for (var i = 0; i < numb; i++) {
				$('#buttons').append("<div class='but'></div>");
				var z = n_width() + 17 + 'px';
				$('#buttons').css('width', z);
			}

            //arrows - next, previous slide

			var count = 0;

			$('.arrow2').click(function(){
				count++;
				SlideAnimation('animation');
                if(count >= numb){
                	count = 0;
                	Case(count);
                	colorPoint();
                }
                else {
                	Case(count);
                	colorPoint();
                }   

                console.log(count)  

			});

			$('.arrow').click(function(){
				count--;
				colorPoint();
				SlideAnimation('animation');
				if(count < 0) {
					Case(numb - 1);
					count = numb - 1;
				}
				else {
					Case(count);
				}
			});

            //Animation
			function SlideAnimation (anim) {
				$('.picture').removeClass(anim);
				
				function animation(){
					$('.picture').addClass(anim);
				};

			setTimeout(animation, 0);

			};


			//Function color point
			function colorPoint(){

				var selector = '.but:eq(' + count + ')';
				$('.but').css('background', 'transparent')
				$(selector).css('background', 'black');

			}

            
            //Point color change

            	$('.but').click(function(){
            		var butIndex = $(this).index();
            		count = butIndex;
            		Case(butIndex);
            		colorPoint();
            		SlideAnimation ('animation');
            	});

            //Change arrow by click


            var arrowLeft = '.arrow';
            var arrowRight = '.arrow2';

            $(arrowLeft).click(function(){
            	ChangeSizeArrow(arrowLeft);

            });

            $(arrowRight).click(function(){
            	ChangeSizeArrow(arrowRight);

            });

            
            function ChangeSizeArrow(arrowChange){
            	$(arrowChange).mousedown(function(){
            		$(this).css('transform','scale(.6)')
            	});

            	$(arrowChange).mouseup(function(){
            		$(this).css('transform','scale(1)')
            	});
            };




            //Case

            function Case(number) {



            	switch (number) {
					case 0: {
						$('.picture').attr('src', Images.img1.pic);
						$('.content').text(Images.img1.desc1);
						$('.description').text(Images.img1.desc2);
						break;
					};

					case 1: {
						$('.picture').attr('src', Images.img2.pic);
						$('.content').text(Images.img2.desc1);
						$('.description').text(Images.img2.desc2);
						break;
					};

					case 2: {
						$('.picture').attr('src', Images.img3.pic);
						$('.content').text(Images.img3.desc1);
						$('.description').text(Images.img3.desc2);
						break;
					};

					case 3: {
						$('.picture').attr('src', Images.img4.pic);
						$('.content').text(Images.img4.desc1);
						$('.description').text(Images.img4.desc2);
						break;
					};

					case 4: {
						$('.picture').attr('src', Images.img5.pic);
						$('.content').text(Images.img5.desc1);
						$('.description').text(Images.img5.desc2);
						break;
					};

					case 5: {
						$('.picture').attr('src', Images.img6.pic);
						$('.content').text(Images.img6.desc1);
						$('.description').text(Images.img6.desc2);
						break;
					};

					case 6: {
						$('.picture').attr('src', Images.img7.pic);
						$('.content').text(Images.img7.desc1);
						$('.description').text(Images.img7.desc2);
						break;
					};

					case 7: {
						$('.picture').attr('src', Images.img8.pic);
						$('.content').text(Images.img8.desc1);
						$('.description').text(Images.img8.desc2);
						break;
					};

					case 8: {
						$('.picture').attr('src', Images.img9.pic);
						$('.content').text(Images.img9.desc1);
						$('.description').text(Images.img9.desc2);
						break;
					};
				};
            };



		   window.onload = function(){
	         $('.but:eq(0)').css('background', 'black');
	         $('.content').text(Images.img1.desc1);
		     $('.description').text(Images.img1.desc2);
		     $('.picture').attr('src', Images.img1.pic);
           };          
		});