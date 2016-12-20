function waterColummValueInit(watercolumn_id, watercolumn_name) {
	$.cookie('watercolumn', JSON.stringify({
		id: watercolumn_id,
		name: watercolumn_name
	}), { expires: 7 });

	loadWaterColumnValueTable();
}

function loadWaterColumnValueTable() {
	if ($.cookie('groupwatercolumn')) {
		var groupwatercolumn = JSON.parse($.cookie('groupwatercolumn'));
	}

	if ($.cookie('watercolumn')) {
		var watercolumn = JSON.parse($.cookie('watercolumn'));
	}

	$.ajax({
		type: 'GET',
		url: 'http://localhost/ground_water/api/admin/controller/watercolumnvalues.php?',
		data: {
			'action' : 'get_by_columnid',
			'id' :  watercolumn.id
		},
		dataType: 'json',
		error: function(data) {
			console.log(data);
		},
		success: function (data) {

			if (data.message != 'NoData') {
				parseDataToWaterColumnValueTable(
					groupwatercolumn.id,
					groupwatercolumn.name,
					watercolumn.id,
					watercolumn.name,
					data.message
				);
			} else {
				parseDataToWaterColumnValueTable(
					groupwatercolumn.id,
					groupwatercolumn.name,
					watercolumn.id,
					watercolumn.name
				);
			}
		}
	});
}

function parseDataToWaterColumnValueTable(groupwatercolumn_id, groupwatercolumn_name, watercolumn_id, watercolumn_name, data = null) {
	var mainTable = document.getElementById('main-table');
	var mainTitle = document.getElementById('main-title');
	var mainTopNavigation = document.getElementById('top-navigation');
	var resultOfTableHTML = '';
	
	mainTopNavigation.innerHTML = '';
	mainTable.innerHTML = '';
	// init table HTML
	resultOfTableHTML = `<thead>
							<tr>
								<th>No</th>
								<th>Value</th>
								<th>Note</th>
								<th>Date Time</th>
								<th class="text-right"></th>
							</tr>
						</thead>
						<tbody>`;
	if (data != null) {
		for (var i = 0; i < data.length; i++) {
			resultOfTableHTML = resultOfTableHTML +
				'<tr>' +
				'<td>' + (i + 1) +'</td>' +
				'<td>' + data[i].value +'</td>' +
				'<td>' + data[i].note +'</td>' +
				'<td>' + data[i].created_at +'</td>' +
				'<td class="text-right">' +
				'<button type="button" class="btn btn-icon-toggle" onclick="showWaterColumnValueEditForm('+ data[i].id + ',' + data[i].value + ',\'' + data[i].note + '\',\'' + data[i].created_at +'\')" data-toggle="tooltip" data-placement="top" data-original-title="Edit"><i class="fa fa-pencil"></i></button>' +
				'<button type="button" class="btn btn-icon-toggle" onclick="deleteWaterColumnValue('+ data[i].id + ')" data-toggle="tooltip" data-placement="top" data-original-title="Delete"><i class="fa fa-trash-o"></i></button>' +
				'</td></tr>';
		}
	}
		
	// close tbody of table
	resultOfTableHTML = resultOfTableHTML + '</tbody>';
	mainTable.innerHTML = resultOfTableHTML;
	mainTitle.innerHTML = watercolumn_name;
	mainTopNavigation.innerHTML = mainTopNavigation.innerHTML +
		'<br>' +
		'<button type ="button" class="btn ink-reaction btn-raised btn-default" id="main-back" href="javascript: void(0)" onclick="loadWaterColumnTable()"><i class="fa fa-arrow-left fa-fw"></i>Back</button>     ' +
		'<button type ="button" class="btn ink-reaction btn-raised btn-accent" id="main-create" href="javascript: void(0)" onclick="showWaterColumnValueCreateForm()"><i class="fa fa-plus fa-fw"></i>Create</button>     ' +
		'<button type ="button" class="btn ink-reaction btn-raised btn-info" id="main-request" href="javascript: void(0)" onclick="requestWaterColumnValue()"><i class="fa fa-refresh fa-fw"></i>Request</button>     ';

	$(".modal").load("../../water_column_value/_form.html");
}

function requestWaterColumnValue() {
	if ($.cookie('watercolumn')) {
		var watercolumn = JSON.parse($.cookie('watercolumn'));
	}

	$.ajax({
		type: 'POST',
		url: 'http://localhost/ground_water/api/admin/controller/watercolumns.php?',
		data: {
			'action': 'request',
			'id' :  watercolumn.id
		},
		dataType: 'json',
		error: function(data) {
			console.log(data);
		},
		success: function (data) {
			document.getElementById('main-request').innerHTML = '<i class="fa fa-spinner fa-spin fa-fw" aria-hidden="true"></i>Requesting...';
			setTimeout(function() {
					document.getElementById('main-request').innerHTML = '<i class="fa fa-refresh fa-fw" aria-hidden="true"></i>Request'
					loadWaterColumnValueTable(); 
				}, 
				60000
			);
		}
	});
}

function showWaterColumnValueCreateForm() {
	var value = '';
	var note = '';
	var datetime = '';

	if ($.cookie('watercolumnvalue')) {
		var watercolumnvalue = JSON.parse($.cookie('watercolumnvalue'));
		value = watercolumnvalue['value'];
		note = watercolumnvalue['note'];
		datetime = watercolumnvalue['datetime'];
		$.removeCookie('watercolumnvalue');
	}

	document.getElementById('formWaterColumnValueModalLabel').innerText = 'CREATE WATER COLUMN VALUE';
	document.getElementById('watercolumnvalue').value = value ? value : '';
	document.getElementById('watercolumnvaluenote').value = note ? note : '';
	document.getElementById('watercolumnvaluedatetime').value = datetime ? datetime : '';
	document.getElementById('watercolumnvalueback').onclick = function() { $(".modal").modal('hide'); };
	document.getElementById('watercolumnvaluesubmit').onclick = function() { showWaterColumnValueConfirmForm(); };
	$(".modal").modal();
}

function showWaterColumnValueEditForm(id = null, value = null, note = null, datetime = null) {
	if ($.cookie('watercolumnvalue')) {
		var watercolumnvalue = JSON.parse($.cookie('watercolumnvalue'));
		value = watercolumnvalue['value'];
		note = watercolumnvalue['note'];
		datetime = watercolumnvalue['datetime'];
		$.removeCookie('watercolumnvalue');
	}

	document.getElementById('formWaterColumnValueModalLabel').innerText = 'EDIT WATER COLUMN VALUE';
	document.getElementById('watercolumnvalue').value = value;
	document.getElementById('watercolumnvaluenote').value = note;
	document.getElementById('watercolumnvaluedatetime').value = datetime;
	document.getElementById('watercolumnvalueback').onclick = function() { $(".modal").modal('hide'); };
	document.getElementById('watercolumnvaluesubmit').onclick = function() { showWaterColumnValueConfirmForm(id); };
	$(".modal").modal();
}

function showWaterColumnValueConfirmForm(id = null) {
	document.getElementById('formWaterColumnValueModalLabel').innerText = 'CONFIRM WATER COLUMN VALUE';
	document.getElementById('watercolumnvalue').readOnly = true;
	document.getElementById('watercolumnvaluenote').readOnly = true;
	document.getElementById('watercolumnvaluedatetime').readOnly = true;
	document.getElementById('watercolumnvalueback').innerHTML = '<i class="fa fa-arrow-left fa-fw"></i>back';
	document.getElementById('watercolumnvalueback').onclick = function() {
		// set value have just put
		$.cookie('watercolumnvalue', JSON.stringify({
			value: document.getElementById('watercolumnvalue').value,
			note: document.getElementById('watercolumnvaluenote').value,
			datetime: document.getElementById('watercolumnvaluedatetime').value
		}), { expires: 7 });

		// reset form readonly
		document.getElementById('watercolumnvalue').readOnly = false;
		document.getElementById('watercolumnvaluenote').readOnly = false;
		document.getElementById('watercolumnvaluedatetime').readOnly = false;
		this.innerHTML = '<i class="fa fa-times fa-fw" aria-hidden="true"></i>Cancel';
		document.getElementById('watercolumnvaluesubmit').innerHTML = '<i class="fa fa-check fa-fw" aria-hidden="true"></i>Next';

		id ? showWaterColumnValueEditForm(id) : showWaterColumnValueCreateForm();
	};

	document.getElementById('watercolumnvaluesubmit').innerHTML = '<i class="fa fa-floppy-o fa-fw" aria-hidden="true"></i>Save';
	document.getElementById('watercolumnvaluesubmit').onclick = function() {
		id ? saveWaterColumnValue(id) : saveWaterColumnValue();

		// reset form
		document.getElementById('watercolumnvalue').readOnly = false;
		document.getElementById('watercolumnvaluenote').readOnly = false;
		document.getElementById('watercolumnvaluedatetime').readOnly = false;
	};
}

function createWaterColumnValue1(groupwatercolumn_id, groupwatercolumn_name, watercolumn_id, watercolumn_name) {
	var value = document.getElementById('watercolumnvalue').value;
	var note = document.getElementById('groupwatercolumnnote').value;
	var datetime = document.getElementById('groupwatercolumndatetime').value;

	$("#groupwatercolumn-modal").modal('hide');

	$.ajax({
		type: 'POST',
		url: 'http://localhost/ground_water/api/admin/controller/watercolumnvalues.php?action=create',
		data: {
			'action': 'create',
			'watercolumn_id' : watercolumn_id,
			'value': value,
			'note' : note,
			'datetime': datetime
		},
		success: function(data) {
			loadWaterColumnValueTable(groupwatercolumn_id, groupwatercolumn_name, watercolumn_id, watercolumn_name);
			toastr.success('Create success');
		},
		error: function(data) {
			toastr.error('Create fail');
		}
	});
}

function saveWaterColumnValue(id = null) {
	var value = document.getElementById('watercolumnvalue').value;
	var note = document.getElementById('watercolumnvaluenote').value;
	var datetime = document.getElementById('watercolumnvaluedatetime').value;
	var action = '';
	var watercolumnvalue = [];
	var watercolumn = JSON.parse($.cookie('watercolumn'));

	if (id == null) {
		action = 'create_by_columnid';
		watercolumnvalue = {
			id : watercolumn.id,
			value : value
		};
	} else {
		action = 'edit';
		watercolumnvalue = {
			id : id,
			value : value,
			note : note,
			datetime : datetime
		};
	}

	$.ajax({
		type: 'POST',
		url: 'http://localhost/ground_water/api/admin/controller/watercolumnvalues.php?action=' + action,
		data: watercolumnvalue,
		success: function(data) {
			$(".modal").modal('hide');
			loadWaterColumnValueTable();
			toastr.success('Success');
		},
		error: function(data) {
			toastr.error('Fail');
		}
	});
}

function deleteWaterColumnValue(id) {
	$.ajax({
		type: 'POST',
		url: 'http://localhost/ground_water/api/admin/controller/watercolumnvalues.php?',
		data: {
			'action': 'delete',
			'id' : id
		},
		success: function(data) {
			loadWaterColumnValueTable();
			toastr.success('Delete success');
		},
		error: function(data) {
			toastr.error('Delete fail');
		}
	});
}

