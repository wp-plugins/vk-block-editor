/**
* VK Block Editor jquery plugin
* By Hidekazu Ishikawa
* vektor-inc
**/

jQuery(document).ready(function($){

/*-------------------------------------------*/
/*	setting start
/*-------------------------------------------*/
// add start button before #wp-content-media-buttons
$("#wp-content-media-buttons").before("<input id=\"editorActivate\" type=\"button\" class=\"button-primary tadv_btn\" value=\"Insert layout block\">");

// load vk-editor-body css ( this file load timing is load page after 0.3 second. )
setTimeout(function(){
	$('iframe').contents().find('head').append(
	'<link href="/wp-content/plugins/vk-block-editor/css/vk-editor-body.css?=2" rel="stylesheet" type="text/css">\
	<link href="/wp-content/plugins/vk-block-editor/css/vk-editor-admin-body.css?=2" rel="stylesheet" type="text/css">\
	');
	$('iframe').contents().find('head').append("");
},500);

/*
<script type='text/javascript' src='/wp-content/plugins/vk-block-editor/js/jquery-1.3.2.js'></script>\
<script type='text/javascript' src='/wp-content/plugins/vk-block-editor/js/jquery-ui-1.7.2.custom.min.js'></script>\
<script type='text/javascript' src='/wp-content/plugins/vk-block-editor/js/vk-editor-body.js'></script>\
*/
// set insertMode
var insertMode = "insertNonActive";

/*-------------------------------------------*/
/*	Mouse action active to switch visual mode
/*-------------------------------------------*/
$("#content-tmce").click(function(){
		blockOuterMouseAction();
		vkColInnerMouseAction();
});

/*-------------------------------------------*/
/*	functions
/*-------------------------------------------*/
// put edit btn
function putAddBtn(){
	$('iframe').contents().find('body').prepend("<button class=\"vkAddBtn\">+</button>");
	$('iframe').contents().find('.blockOuter').after("<button class=\"vkAddBtn\">+</button>");
	$('iframe').contents().find('h1').after("<button class=\"vkAddBtn\">+</button>");
	$('iframe').contents().find('h2').after("<button class=\"vkAddBtn\">+</button>");
	$('iframe').contents().find('h3').after("<button class=\"vkAddBtn\">+</button>");
	$('iframe').contents().find('h4').after("<button class=\"vkAddBtn\">+</button>");
	$('iframe').contents().find('h5').after("<button class=\"vkAddBtn\">+</button>");
	$('iframe').contents().find('h6').after("<button class=\"vkAddBtn\">+</button>");
	$('iframe').contents().find('p').after("<button class=\"vkAddBtn\">+</button>");
	$('iframe').contents().find('ul').after("<button class=\"vkAddBtn\">+</button>");
	$('iframe').contents().find('dl').after("<button class=\"vkAddBtn\">+</button>");
}

/*-------------------------------------------*/
/*	blockOuter mouse action
/*-------------------------------------------*/
setTimeout(function(){
	blockOuterMouseAction();
},500);

function blockOuterMouseAction(){
	
	/*-------------------------------------------*/
	// blockOuter mouseenter
	/*-------------------------------------------*/	
	$('iframe').contents().find('.blockOuter').mouseenter(function(){
		$(this).addClass("blockOver");
		$(this).prepend('<div class="blockEditMenu">\
		<button class="blockDeleteBtn">Delete</button>\
		<button class="blockSettingBtn blockOuterSettingBtn">OuterSetting</button>\
		</div>');
		/*-------------------------------------------*/
		// delete double buttons
		/*-------------------------------------------*/
		$('iframe').contents().find('.blockDeleteBtn').prev('.blockDeleteBtn').remove();
		$('iframe').contents().find('.blockEditMenu').prev('.blockEditMenu').remove();
		/*-------------------------------------------*/
		// delete blockOuter action
		/*-------------------------------------------*/
		$('iframe').contents().find('.blockDeleteBtn').click(function(){
			$(this).parent().parent().remove();
		});
		/*-------------------------------------------*/
		// Block Padding Setting
		/*-------------------------------------------*/
		$('iframe').contents().find('.blockOuterSettingBtn').click(function(){
			// prebent double open
			closeOuterBlockAction();
			// put editing flag
			$(this).parent().parent().addClass('blockOuterEditing');
			
			// openEditPanel
			$('iframe').before(
			'<div class="vkEditPanel" id="vkOuterBlockSettingPanel">\
			<div class="vkEditPanelHead">\
			<h3>Outer block setting</h3>\
			<div class="vkEditPanelClose btn"><a href="#">Close</a></div>\
			</div>\
			<div class="vkEditPanelBody">\
			<p>Please input padding</p>\
			<label>upper <input id="upperPadding" type="text" size="5" class="setPaddingSize">px</label>\
			<label>under <input id="underPadding" type="text" size="5" class="setPaddingSize">px</label>\
			<a href="#" id="outerBlockSettingDecide" class="button-primary">Decide setting</a>\
			</div></div>');
			
			// Block setting decide
			$('#outerBlockSettingDecide').click(function(){
				var upperPadding = $("#upperPadding").val();
				var underPadding = $("#underPadding").val();
				if (upperPadding == "") { upperPadding == "0px" } else { upperPadding = upperPadding + 'px' };
				if (underPadding == "") { underPadding == "0px" } else { underPadding = underPadding + 'px' };
				$('iframe').contents().find('.blockOuterEditing').css({ "padding-top": upperPadding ,"padding-bottom":underPadding });
				// mce style delete
				$('iframe').contents().find('.blockOuterEditing').removeAttr('data-mce-style');
				closeOuterBlockAction();
			});
			
			// close EditPanel
			$('.vkEditPanelClose').click(function(){
				closeOuterBlockAction();
			});


		}); // end Block Padding Setting

	});
	/*-------------------------------------------*/
	// blockOuter mouseleave
	/*-------------------------------------------*/
	$('iframe').contents().find('.blockOuter').mouseleave(function(){
		$(this).removeClass("blockOver");
		$('iframe').contents().find('.blockEditMenu').remove();
	});
	/*-------------------------------------------*/
	// closeOuterBlockAction
	/*-------------------------------------------*/
	function closeOuterBlockAction(){
		$('#vkOuterBlockSettingPanel').remove();
		$('iframe').contents().find('.blockOuterEditing').removeClass('blockOuterEditing');
	}

}

/*-------------------------------------------*/
/*	vkColInner mouse action
/*-------------------------------------------*/
setTimeout(function(){
	vkColInnerMouseAction();
},500);

function vkColInnerMouseAction(){
	
	/*-------------------------------------------*/
	// vkColInner mouseenter
	/*-------------------------------------------*/	
	$('iframe').contents().find('.vkColInner').mouseenter(function(){
		$(this).addClass("blockOver");
		$(this).prepend('<div class="blockEditMenu">\
		<button class="blockSettingBtn vkColInnerSettingBtn">InnerSetting</button>\
		</div>');
		/*-------------------------------------------*/
		// delete double buttons
		/*-------------------------------------------*/
		$('iframe').contents().find('.blockEditMenu').prev('.blockEditMenu').remove();
		/*-------------------------------------------*/
		// Block Padding Setting
		/*-------------------------------------------*/
		$('iframe').contents().find('.vkColInnerSettingBtn').click(function(){
			// prebent double open
			closeColInnerAction();
			// put editing flag
			$(this).parent().parent().addClass('vkColInnerEditing');
			
			// openEditPanel
			$('iframe').before(
			'<div class="vkEditPanel" id="vkColInnerSettingPanel">\
			<div class="vkEditPanelHead">\
			<h3>Innercell setting</h3>\
			<div class="vkEditPanelClose btn"><a href="#">Close</a></div>\
			</div>\
			<div class="vkEditPanelBody">\
			<p>Please input cell padding</p>\
			<label>upper <input id="upperPadding" type="text" size="5" class="setPaddingSize">px</label>\
			<label>right <input id="rightPadding" type="text" size="5" class="setPaddingSize">px</label>\
			<label>under <input id="underPadding" type="text" size="5" class="setPaddingSize">px</label>\
			<label>left <input id="leftPadding" type="text" size="5" class="setPaddingSize">px</label>\
			<a href="#" id="vkColInnerSettingDecide" class="button-primary">Decide setting</a>\
			</div></div>');
			
			// Block setting decide
			$('#vkColInnerSettingDecide').click(function(){
				var upperPadding = $("#upperPadding").val();
				var rightPadding = $("#rightPadding").val();
				var underPadding = $("#underPadding").val();
				var leftPadding = $("#leftPadding").val();
				if (upperPadding == "") { upperPadding == "0px" } else { upperPadding = upperPadding + 'px' };
				if (rightPadding == "") { rightPadding == "0px" } else { rightPadding = rightPadding + 'px' };
				if (underPadding == "") { underPadding == "0px" } else { underPadding = underPadding + 'px' };
				if (leftPadding == "") { leftPadding == "0px" } else { leftPadding = leftPadding + 'px' };
				$('iframe').contents().find('.vkColInnerEditing').css({ "padding-top" : upperPadding ,"padding-bottom" : underPadding , "padding-right" : rightPadding ,"padding-left" : leftPadding });
				// mce style delete
				$('iframe').contents().find('.vkColInnerEditing').removeAttr('data-mce-style');
				closeColInnerAction();
			});
			
			// close EditPanel
			$('.vkEditPanelClose').click(function(){
				closeColInnerAction();
			});


		}); // end Block Padding Setting

	});
	/*-------------------------------------------*/
	// mouseleave
	/*-------------------------------------------*/
	$('iframe').contents().find('.vkColInner').mouseleave(function(){
		$(this).removeClass("blockOver");
		$('iframe').contents().find('.vkColInner .blockEditMenu').remove();
	});
	/*-------------------------------------------*/
	// closeOuterBlockAction
	/*-------------------------------------------*/
	function closeColInnerAction(){
		$('#vkColInnerSettingPanel').remove();
		$('iframe').contents().find('.vkColInnerEditing').removeClass('vkColInnerEditing');
	}

}


/*-------------------------------------------*/
/*	putColmun end action
/*-------------------------------------------*/
function putColumnCloseAction(){
	// delete editing flag 
	$('iframe').contents().find('.editingBtnPoint').remove();
	// close edit panel
	$('#vkInsertColumnPanel').remove();
	// delete vkAddBtn
	$('iframe').contents().find('.vkAddBtn').remove();
	// change insert mode
	$("#editorActivate").attr("value","Insert layout block");
	insertMode = "insertNonActive";
	// add last %nbsp; -  -
	$('iframe').contents().find('.blockOuter:last').after("&nbsp;");	
	//
	blockOuterMouseAction();
	vkColInnerMouseAction();
}

	/*-------------------------------------------*/
	/*	editorActivate
	/*-------------------------------------------*/

	$("#editorActivate").click(function(){
		// remove fuck mce p tags
		$('iframe').contents().find('p').each(function(i){
			var pHtml = $(this).html();
			// fuck &nbsp; auto p
			if ( pHtml == "&nbsp;" || pHtml == "") {
				$(this).remove();
			}
		});

		/*-------------------------------------------*/
		/*	insertActive
		/*-------------------------------------------*/
		if (insertMode == "insertNonActive") {
			$("#editorActivate").attr("value","Cancel Insert Block");
			insertMode	= "insertActive";
			
			putAddBtn();

			// add EditPosition id
			$('iframe').contents().find('.vkAddBtn').each(function(i){
				$(this).attr( 'id' , 'editPosition' + (i+1));
			});

			/*-------------------------------------------*/
			// openEditPanel - column insert
			/*-------------------------------------------*/
			$('iframe').contents().find('.vkAddBtn').click(function(){
				$('iframe').before(
				'<div class="vkEditPanel" id="vkInsertColumnPanel">\
				<div class="vkEditPanelHead">\
				<h3>Insert Columin</h3>\
				<div class="vkEditPanelClose btn"><a href="#">Close</a></div>\
				</div>\
				<div class="vkEditPanelBody">\
				<p>Select block type</p>\
				<ul class="colselect">\
				<li class="putColumn bt_11"><a href="#" class="btn">[1/1]</a></li>\
				<li class="putColumn bt_12-12"><a href="#" class="btn">[1/2][1/2]</a></li>\
				<li class="putColumn bt_13-13-13"><a href="#" class="btn">[1/3][1/3][1/3]</a></li>\
				<li class="putColumn bt_23-13"><a href="#" class="btn">[ 2 / 3 ][1/3]</a></li>\
				<li class="putColumn bt_13-23"><a href="#" class="btn">[1/3][ 2 / 3 ]</a></li>\
				<li class="putColumn bt_14-14-14-14"><a href="#" class="btn">[1/4][1/4][1/4][1/4]</a></li>\
				<li class="putColumn bt_34-14"><a href="#" class="btn">[ 3 / 4 ][1/4]</a></li>\
				<li class="putColumn bt_14-34"><a href="#" class="btn">[1/4][ 3 / 4 ]</a></li>\
				</ul>\
				</div></div>');
				
				// put editing flag
				$(this).after('<div class="editingBtnPoint">Block is inserted to this point.</div>')
				$(this).remove();
				$('iframe').contents().find('.vkAddBtn').remove();
				
				/*-------------------------------------------*/
				// column btn action
				/*-------------------------------------------*/
				// 1/1
				$('.bt_11').click(function(){
					$('iframe').contents().find('.editingBtnPoint').after(
					'<div class="blockOuter">\
					<div class="vkCol vkCol11"><div class="vkColInner">Please input here.</div></div>\
					</div>');
					putColumnCloseAction();
				});
				// 1/2-1/2
				$('.bt_12-12').click(function(){
					$('iframe').contents().find('.editingBtnPoint').after(
					'<div class="blockOuter">\
					<div class="vkCol vkCol12"><div class="vkColInner">Please input here.</div></div>\
					<div class="vkCol vkCol12"><div class="vkColInner">Please input here.</div></div>\
					</div>');
					putColumnCloseAction();
				});
				// 1/3-1/3-1/3
				$('.bt_13-13-13').click(function(){
					$('iframe').contents().find('.editingBtnPoint').after(
					'<div class="blockOuter">\
					<div class="vkCol vkCol13"><div class="vkColInner">Please input here.</div></div>\
					<div class="vkCol vkCol13"><div class="vkColInner">Please input here.</div></div>\
					<div class="vkCol vkCol13"><div class="vkColInner">Please input here.</div></div>\
					</div>');
					putColumnCloseAction();
				});
				// 2/3-1/3
				$('.bt_23-13').click(function(){
					$('iframe').contents().find('.editingBtnPoint').after(
					'<div class="blockOuter">\
					<div class="vkCol vkCol23"><div class="vkColInner">Please input here.</div></div>\
					<div class="vkCol vkCol13"><div class="vkColInner">Please input here.</div></div>\
					</div>');
					putColumnCloseAction();
				});
				// 1/3-2/3
				$('.bt_13-23').click(function(){
					$('iframe').contents().find('.editingBtnPoint').after(
					'<div class="blockOuter">\
					<div class="vkCol vkCol13"><div class="vkColInner">Please input here.</div></div>\
					<div class="vkCol vkCol23"><div class="vkColInner">Please input here.</div></div>\
					</div>');
					putColumnCloseAction();
				});
				// 1/4-1/4-1/4-1/4
				$('.bt_14-14-14-14').click(function(){
					$('iframe').contents().find('.editingBtnPoint').after(
					'<div class="blockOuter">\
					<div class="vkCol vkCol14"><div class="vkColInner">Please input here.</div></div>\
					<div class="vkCol vkCol14"><div class="vkColInner">Please input here.</div></div>\
					<div class="vkCol vkCol14"><div class="vkColInner">Please input here.</div></div>\
					<div class="vkCol vkCol14"><div class="vkColInner">Please input here.</div></div>\
					</div>');
					putColumnCloseAction();
				});
				// 3/4-1/4
				$('.bt_34-14').click(function(){
					$('iframe').contents().find('.editingBtnPoint').after(
					'<div class="blockOuter">\
					<div class="vkCol vkCol34"><div class="vkColInner">Please input here.</div></div>\
					<div class="vkCol vkCol14"><div class="vkColInner">Please input here.</div></div>\
					</div>');
					putColumnCloseAction();
				});
				// 1/4-3/4
				$('.bt_14-34').click(function(){
					$('iframe').contents().find('.editingBtnPoint').after(
					'<div class="blockOuter">\
					<div class="vkCol vkCol14"><div class="vkColInner">Please input here.</div></div>\
					<div class="vkCol vkCol34"><div class="vkColInner">Please input here.</div></div>\
					</div>');
					putColumnCloseAction();
				});

				// close EditPanel
				$('.vkEditPanelClose').click(function(){
					putColumnCloseAction();
				});
			});	
		} else {
		/*-------------------------------------------*/
		/*	editNonActive / cancel action
		/*-------------------------------------------*/
			putColumnCloseAction();			
		}

	});
/*
	$('iframe').contents().find('.dragOuter').sortable({
		connectWith: '.dragOuter',
		handle: 'h2',
		cursor: 'move',
		placeholder: 'placeholder',
		forcePlaceholderSize: true,
		opacity: 0.4,
	})
	.disableSelection();
*/
});