<?php
/*
Plugin Name: VK Block Editor
Plugin URI: http://vektor-inc.co.jp
Description: This pulugin is possible to Block layout on Tinymce editor.
Version: 0.1.0.6
Author: Vektor,Inc,
Author URI: http://vektor-inc.co.jp
License: GPL2
*/
/*  Copyright 2012 Hidekazu Ishikawa ( email : kurudrive@gmail.com )

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as
	published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA

/*-------------------------------------------*/
/*	load & setting vk-editor
/*-------------------------------------------*/

function vk_admin_loadfile(){
	/*
	wp_enqueue_script( 'jquery-ui-tabs' );
	wp_enqueue_script( 'jquery-ui-draggable' );
	wp_enqueue_script( 'jquery-ui-sortable' );
	wp_enqueue_script( 'jquery-ui-dialog' );
	wp_register_script( 'drag-drop-panels' , plugins_url().'/js/jquery-ui-1.7.2.custom.min.js', array('jquery'), '20120622');
	wp_enqueue_script( 'drag-drop-panels' );
	*/

	// load js for admin
	wp_enqueue_script( 'admin_load_js', plugins_url() . '/vk-block-editor/js/vk-editor.js', array( 'jquery' ), '2012-06-30' );
	// load css for admin
	wp_enqueue_style( 'admin_load_admin_css', plugins_url() . '/vk-block-editor/css/vk-editor-admin.css' , false, '2012-06-24');
	//wp_enqueue_style( 'admin_load_admin_css', plugins_url() . '/vk-block-editor/css/vk-editor-body.css' , false, '2012-06-24');
	//wp_enqueue_style( 'admin_load_admin_css', plugins_url() . '/vk-block-editor/css/vk-editor-admin-body.css' , false, '2012-06-24');
	wp_enqueue_style( 'admin_load_panel_css', plugins_url() . '/vk-block-editor/css/vk-editor-panel.css' , false, '2012-06-24');
}
add_action('admin_head-post.php', 'vk_admin_loadfile', 11);
add_action('admin_head-post-new.php', 'vk_admin_loadfile', 11);

function setVkBlockEditorCss(){
	wp_enqueue_style( 'setVkBlockEditorCss', plugins_url() . '/vk-block-editor/css/vk-editor-body.css' , false, '2012-06-24');
}
add_action('wp_head', 'setVkBlockEditorCss');