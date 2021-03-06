var scholarOneSearch = (function(){
  "use strict";

  //build report a problem links;
  var reportAProblem = function(){
    var $results = $('#exlidResultsTable tr.EXLResult');
    $results.each(function(){
      var title = $(this).find('h2.EXLResultTitle').text().trim();
      var id = $(this).find('a.EXLResultRecordId').attr('id');
      //The Document ID
      var titleStr = title + ' (' + id + ')';
      
      var url = 'http://library.northeastern.edu/get-help/tech-support/report-a-problem?resource=' + encodeURIComponent(titleStr);

      var $link = $('<li><a class="report-a-problem  btn btn-small btn-link" href="' + url + '" title="Report a problem." target="_blank"><i class="icon-warning-sign"></a><li>');
      $(this).find('ul.EXLResultTabs').append($link);
    });
    $('a.report-a-problem').tooltip();
  };

  var signinPopover  = function(){
    if ( sessionStorage.getItem('popoverDissmiss') !== 'true'){
      $('ul.EXLEShelfTileGuest > li.EXLSignOut').popover({
      title: 'Why Sign In?<button="#exlidSignOut" id="nulib-signin-popover" class="close pull-right" onclick="scholarOneSearch.dismissSigninPopover()")">x</button>',
      content: '<p>Get more results, personalized for you!</p>',
      placement: 'bottom',
      // trigger: 'manual',
      html: true,
      }).popover('show');
    }
    else{
      return;
    } 
  };

  var dismissSigninPopover = function(){
    $('ul.EXLEShelfTileGuest > li.EXLSignOut').popover('hide');
    sessionStorage.setItem('popoverDissmiss', 'true');
  };

  //move the a-to-z link item to the search bar.
  //buildNavBarNav();
  //
  var buildFacetCollapse = function(){
    var i = 1;
    $('li.EXLFacetsDisplayMore').hide();
    //Creating a collapse group.
    $('#facetList > .EXLFacetContainer').each(function(){
      
      var $link = $('<a href="#expandFacet'+ i +'"/></a>');
      var $icon = $('<i class="icon-expand-alt icon-large pull-right"></i>');
      $link.click(function(){
        $(this).parents('.EXLFacetContainer').find('li.EXLFacet').toggleClass('EXLAdditionalFacet');
        $(this).find('i').toggleClass('icon-expand-alt').toggleClass('icon-collapse-alt');
      });
      $(this).find('h4').wrap($link).after($icon);
      i++;
    });
  };

  var  eShelfIcons = function(){
    $('img[alt="Add to e-Shelf"]').after('<i class="icon-bookmark-empty icon-large"></i>').hide();
    $('img[alt="In e-Shelf"]').after('<i class="icon-bookmark icon-large"></i>').hide();
    $('td.EXLMyShelfStar > a').addClass('btn btn-success btn-small').click(function(){
      if ($(this).data('original-title') === "In e-Shelf"){
          $(this).tooltip('destroy').attr('title','Add to e-Shelf').tooltip({title:'Add to e-Shelf'});
      }
      else{
        $(this).tooltip('destroy').attr('title',"In e-Shelf").tooltip({title:'In e-Shelf'});
      }
      var $i  = $(this).children("i");
      if ($i.hasClass('icon-bookmark-empty')){
        $i.removeClass('icon-bookmark-empty').addClass('icon-bookmark');
      }
      else{
        $i.removeClass('icon-bookmark').addClass('icon-bookmark-empty');
      }
    }).tooltip();
  };

  var buildIcons = function(){
    $('a.EXLBriefResultsPaginationLinkNext > img').after('<i class="icon-circle-arrow-right"></i>');
    $('a.EXLBriefResultsPaginationLinkPrevious:first-of-type > img').after('<i class="icon-circle-arrow-left"></i>');
    //just adding a special character to the submit button;
    $('#goButton').val("➜");
    //adding an icon before the RSS link;
    $('form[name="rssForm"]').prepend('<i class="icon-rss"></i>');
    $('.EXLFacetSaveSearchAction > a').before('<i class="icon-save"/>');
    $('.EXLFacetSaveToEShelfAction > a').before('<i class="icon-bookmark"/>');
    $('img[src="../images/icon_popout_tab.png"]').hide().after('<i class="icon-external-link"></i>');
    $('a.EXLFirstRefinementElement').find('#removeFacet').hide().before('<i class="icon-remove-circle close"/>');
    $('img[src="../images/folders_close_inpage.gif"]').hide().before('<i class="icon-folder-close"></i>');
    $('img[src="../images/folders_open.gif"]').hide().before('<i class="icon-folder-open"></i>');
    //$('img[src="../images/full_note.gif"]').hide().before('<i class="icon-comment"></i>');
    //$('img[src="../images/empty_note.gif"]').hide().before('<i class="icon-comment-alt"></i>');
  };

  var addToolTips = function(){
    $("a#showMoreOptions, a.EXLSearchFieldRibbonAdvancedTwoLinks").tooltip(); 
  };

  var buildMainMenu = function(){
    //add a button for a dropdown menu;
      var $dropdown = $('<div class=" pull-right btn-group"><button class="btn btn-default dropdown-toggle" data-toggle="dowpdown" type="button"><i class="icon-reorder"></i><span class="text-hide">Main Menu</span></button><ul class="dropdown-menu"/></div>');
      var $links  = $('#exlidMainMenuRibbon').find('a:visible');
      $('#exlidMainMenuRibbon').hide();
      $dropdown.find('ul.dropdown-menu').html($links);
      $dropdown.find('a').wrap('<li/>');
      $('#exlidMainMenuRibbon').after($dropdown);
      $('.dropdown-toggle').dropdown().tooltip({
        title: "Main menu",
        placement: "right"
      });
    
  }
  
  var addActiveStates = function(){
    var $activeStatesTargets = $('.EXLFindDBListHeaderAtoZSelected > a');
    $activeStatesTargets.addClass('active');
  }

  //handle the radio clicks of the dropdown menus on Primo 
  
  var handleRadio = function(){
    var $radios = $('#scopesListContainer').find('input[type="radio"]');
    $radios.click(function(){
      $radios.removeAttr('checked');
    });
  }

  // Build the draggable handle.
  var draggable = function(){
    $('#draggable').html('<i class="icon-resize-vertical"></i>').find('img').hide();
    $('#demoLibId').before($('#draggable'));
  }


  //Build the page functions.
  var init = function(){
    $('#search_field').attr('placeholder','Search...');
    draggable();
    eShelfIcons();
    buildFacetCollapse();
    reportAProblem();
    buildIcons();
    
    
    addActiveStates();
    handleRadio();
    addToolTips();
    //signinPopover();
    //buildMainMenu();
    //
    console.log('Init Ran!');
  };

  return {
    buildFacetCollapse: buildFacetCollapse,
    signinPopover: signinPopover,
    dismissSigninPopover: dismissSigninPopover,
    eShelfIcons: eShelfIcons,
    buildIcons: buildIcons,
    init: init,
    addToolTips: addToolTips
  };



})();


  window.scholarOneSearch = scholarOneSearch;
  $(document).ready(scholarOneSearch.init);

