function initSwfUpload() {
	new SWFUpload({
		upload_url: context+"/fileupload",
		post_params: {"name" : "test"},
		
		// File Upload Settings
		file_size_limit : "5 MB",	// 1000MB
		file_types : "*.gif;*.png;*.jpg;*.jpeg",
		file_types_description : " ",
		file_upload_limit : "10",
						
		file_queue_error_handler : fileQueueError,
		file_dialog_complete_handler : fileDialogComplete,//选择好文件后提交
		file_queued_handler : fileQueued,
		upload_progress_handler : uploadProgress,
		upload_error_handler : uploadError,
		upload_success_handler : uploadSuccess,
		upload_complete_handler : uploadComplete,

		// Button Settings
		button_image_url : context+"/css/swfupload/images/upload.png",
		button_placeholder_id : "jlButton",
		button_width: 200,
		button_height: 18,
		button_text : '<span class="button">上传实物图片</span>',
		button_text_style : '.button { font-family: Helvetica, Arial, sans-serif; font-size: 12pt; } .buttonSmall { font-size: 10pt; }',
		button_text_top_padding: 0,
		button_text_left_padding: 18,
		button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
		button_cursor: SWFUpload.CURSOR.HAND,
		
		// Flash Settings
		flash_url : context+"/js/swfupload/swfupload.swf",

//		custom_settings : {
//			upload_target : "divFileProgressContainer"
//		},
		// Debug Settings
		debug: false  //是否显示调试窗口
	});
};
