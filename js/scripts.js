// Custom JavaScripts

$(document).ready(function(e)
{
	/* initial setup */
	$('#strDat, #enDat, #strNxtDat, #pckDat').datepicker();
	$('#slider1').tinycarousel();
	$('#vidNoti, #chatNoti').draggable();
	
	
	/* document viewer setup */
	$('a.embed').gdocsViewer({width: 600, height: 750});
	$('#embedURL').gdocsViewer();

	
	/* dropdown loaction */
	$('#locDrp').css('display','none');
	$('#loc').click(function(e)
	{
        $('#locDrp').slideToggle('fast');
    });
	
	
	/* dropdown filter */
	$('#filtCont').css('display','none');
	$('#filt').click(function(e)
	{
        $('#filtCont').slideToggle('fast');
    });

	
	/* menu dropdown */
	$('#menus').css('display','none');
	$('#mnuMob').click(function(e)
	{
        $('#menus').slideToggle('fast');
    });
	
	
	/* menu dropdown */
	$('#usrSet').css('display','none');
	$('#logUsr').click(function(e)
	{
        $('#usrSet').slideToggle('fast');
    });
	
    
	/* video contant page */
	$('.vidTabCont').css('display','none');
	$('#vidTabCont1').css('display','block');
		
	$('.vidTabDsk').removeClass('active');
	$('#vidTabDsk1').addClass('active');
	
	$('.vidTabDsk').on('click', function()
	{
		$('.vidTabDsk').removeClass('active');
		$(this).addClass('active');
	});
	
	$('li[id^="vidTabDsk"]').click(function()
	{
		$('[id^="vidTabCont"]').hide(); // hide the other divs
		$('#vidTabCont'+this.id.slice(9)).css('display','block');
	});
	
	
	/* video mobile contant page */
	$('.vidTabCont').css('display','none');
	$('#vidTabCont1').css('display','block');
		
	$('.vidTabMob').removeClass('actiMob');
	$('#vidTabMob1').addClass('actiMob');
	
	$('.vidTabMob').on('click', function()
	{
		$('.vidTabMob').removeClass('actiMob');
		$(this).addClass('actiMob');
	});
	
	$('li[id^="vidTabMob"]').click(function()
	{
		$('[id^="vidTabCont"]').hide(); // hide the other divs
		$('#vidTabCont'+this.id.slice(9)).css('display','block');
	});
	
	
	/* inbox action */
	$('#mailMnuIconVal1').css('display','none');
	
	$('#usrMailIcon1').click(function(e) {
        $('#mailMnuIconVal1').slideToggle('fast');
    });
	
	
	/* video consultating page */
	$('#vid_Conf, #vidConf, #chat_cont, #vidTabs').css('display','none');
	$('#no_cont').css('display','block');
	
	$('#consTim1').click(function(e) {
        $('#vid_Conf, #chat_cont, #vidTabs').css('display','block');
		$('#vidConf, #no_cont, #vidNoti, #chatNoti').css('display','none');
    });
	
	$('#consTim2').click(function(e) {
        $('#vid_Conf, #vidConf, #vidTabs').css('display','block');
		$('#chat_cont, #no_cont, #vidNoti, #chatNoti').css('display','none');
    });
	
	
	/* mobile video consultating page */
	$('#vid_Conf, #vidConf, #chat_cont, #vidTabs').css('display','none');
	$('#no_cont').css('display','block');
	
	$('#consTiMob1').click(function(e) {
        $('#vid_Conf, #chat_cont').css('display','block');
		$('#vidConf, #no_cont, #vidNoti, #chatNoti, #vidTabs').css('display','none');
    });
	
	$('#consTiMob2').click(function(e) {
        $('#vid_Conf, #vidConf').css('display','block');
		$('#chat_cont, #no_cont, #vidNoti, #chatNoti, #vidTabs').css('display','none');
    });
	
	
	/* chat notify */
	$('#chatNoti').css('display','none');
	
	$('#chtExpIco').click(function(e) {
        $('#chatNoti, #vidTabs').css('display','block');
		$('#vid_Conf').css('display','none');
    });
	
	$('#chatNotiIcn').click(function(e) {
        $('#chatNoti, #vidTabs, #vidNoti').css('display','none');
		$('#vid_Conf').css('display','block');
    });
	
	
	/* video notify */
	$('#vidNoti, #vidConf').css('display','none');
	
	$('#expIcoVid').click(function(e) {
        $('#vidNoti, #vidTabs').css('display','block');
		$('#vid_Conf, #chatNoti').css('display','none');
		
    });
	
	
	/* tablet dosage selection */
	$('#tabMG').addClass('tabTypSel');
	
	$('.tabMGML').on('click', function()
	{
		$('.tabMGML').removeClass('tabTypSel');
		$(this).addClass('tabTypSel');
	});
	
	
	/* tablet time selection */
	$('.tabTim').click(function(e)
	{
		if ($(this).hasClass('tabMS'))
		{			
			$(this).removeClass('tabMS');
			$(this).children('img').removeClass('highligh');
		}
		
		else
		{
			$(this).addClass('tabMS');
			$(this).children('img').addClass('highligh');
		}
		
	});
	
	
	/* tablet dosage selection */
	$('#tabBe').addClass('tabTypSel');
	
	$('.tabFod').on('click', function()
	{
		$('.tabFod').removeClass('tabTypSel');
		$(this).addClass('tabTypSel');
	});
	
	
	/* tablet duration time selection */
	$('.spacD').click(function(e)
	{
		$('.spacD').removeClass('spacDu');
		$(this).addClass('spacDu');
	});
	
	
	/* different layout for video chat */
	$('#vidConf, #vid_Conf, #vidTabs, .reduIco, .restoIco').css('display','none');
	
	$('.expIco').click(function(e)
	{
        $('#vidTabs, .expIco, #vidNoti').css('display','none');
		$('.reduIco, .restoIco, #vid_Conf').css('display','block');
		
		$('#vidTabs').removeClass('vidTabs_exp');
		$('#vid_Conf').addClass('vid_Conf_exp');
    });
	
	
	$('.reduIco').click(function(e)
	{
        $('.reduIco, #vid_Conf').css('display','none');
		$('#vidTabs, .expIco, .restoIco, #vidNoti').css('display','block');
		
		$('#vidTabs').addClass('vidTabs_exp');
		$('#vid_Conf').removeClass('vid_Conf_exp');		
    });
	
	
	$('.restoIco').click(function(e)
	{
        $('#vid_Conf, #vidTabs, .expIco').css('display','block');
		$('.reduIco, .restoIco, #vidNoti').css('display','none');
		
		$('#vidTabs').removeClass('vidTabs_exp');
		$('#vid_Conf').removeClass('vid_Conf_exp');
    });
	
	
	$('#expIcoS').click(function(e)
	{
        $('#vidTabs, #vidNoti').css('display','none');
		$('#reduIco, #vid_Conf').css('display','block');
		
		$('#vid_Conf').css('width','100%');		
    });
	
	
	$('#reduIcoS').click(function(e)
	{
        $('.reduIco, #vid_Conf').css('display','none');
		$('#vidTabs, #expIcoS, #vidNoti').css('display','block');
		
		$('#vidTabs').css('width','100%');		
    });
	
	
	/* video config  */
	$('#noVidMic').css('display','none');
	
	$("#vidConf").mouseover(function()
	{
		$('#noVidMic').css('display','block');
	}).mouseout(function()
	{
    	$('#noVidMic').css('display','none');
	});
	
	
	/* select medicine type */
	$('#selMedTypDrp').css('display','none');
	
	$('#selMediTyp').click(function(e)
	{
        $('#selMedTypDrp').css('display','block');
    });
	
	$('.selMedTypDrp').click(function(e)
	{
        var selMed = $(this);
 		//alert(selMed.text() + ' \nIndex ' + selMed.index());
		$('#selMediTyp').val(selMed.text());
		$('#selMedTypDrp').css('display','none');	
    });
	
	
	/* instruction textarea */
	$('#instTxt').focusin(function()
	{
		if ( this.value == 'Instructions...' )
		{
			this.value = '';
		}
	}).focusout(function()
	{
		if ( this.value == '' )
		{
			this.value = 'Instructions...';    
		}
	});
	
});