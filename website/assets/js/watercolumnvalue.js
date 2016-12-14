function loadWaterColumnValueTable(groupwatercolumn_id, groupwatercolumn_name, watercolumn_id, watercolumn_name) {
	$.ajax({
		type: 'GET',
		url: 'http://localhost/ground_water/api/admin/controller/watercolumnvalues.php?',
		data: {
			'action' : 'get_by_columnid',
			'id' :  watercolumn_id
		},
		dataType: 'json',
		error: function(data) {
			console.log(data);
		},
		success: function (data) {

			if (data.message != 'NoData') {
				parseDataToWaterColumnValueTable(
					data.message,
					groupwatercolumn_id,
					groupwatercolumn_name,
					watercolumn_id,
					watercolumn_name
				);
			} else {
				parseDataToWaterColumnValueTable(
					[],
					groupwatercolumn_id,
					groupwatercolumn_name,
					watercolumn_id,
					watercolumn_name
				);
			}
		}
	});
}

function parseDataToWaterColumnValueTable(data, groupwatercolumn_id, groupwatercolumn_name, watercolumn_id, watercolumn_name) {
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

	for (var i = 0; i < data.length; i++) {
		resultOfTableHTML = resultOfTableHTML +
			'<tr>' +
			'<td>' + (i + 1) +'</td>' +
			'<td>' + data[i].value +'</td>' +
			'<td>' + data[i].note +'</td>' +
			'<td>' + data[i].created_at +'</td>' +
			'<td class="text-right">' +
			'<button type="button" class="btn btn-icon-toggle" onclick="showWaterColumnValueEditForm('+ data[i].id + ',' + data[i].value + ',\'' + data[i].note + '\',\'' + data[i].created_at +'\',' + groupwatercolumn_id +',\'' + groupwatercolumn_name + '\',' + watercolumn_id + ',\'' + watercolumn_name + '\')" data-toggle="tooltip" data-placement="top" data-original-title="Edit"><i class="fa fa-pencil"></i></button>' +
			'<button type="button" class="btn btn-icon-toggle" onclick="deleteWaterColumnValue('+ data[i].id + ',' + groupwatercolumn_id + ',\'' + groupwatercolumn_name + '\',' + watercolumn_id + ',\'' + watercolumn_name + '\')" data-toggle="tooltip" data-placement="top" data-original-title="Delete"><i class="fa fa-trash-o"></i></button>' +
			'</td></tr>';
	}
		
	// close tbody of table
	resultOfTableHTML = resultOfTableHTML + '</tbody>';
	mainTable.innerHTML = resultOfTableHTML;
	mainTitle.innerHTML = watercolumn_name;
	mainTopNavigation.innerHTML = mainTopNavigation.innerHTML +
		'<br>' +
		'<button type ="button" class="btn ink-reaction btn-raised btn-default" id="main-back" href="javascript: void(0)" onclick="loadWaterColumnTable('+ groupwatercolumn_id + ',\'' + groupwatercolumn_name + '\',' + watercolumn_id + ',\'' + watercolumn_name + '\')">Back</button>     ' +
		'<button type ="button" class="btn ink-reaction btn-raised btn-accent" id="main-create" href="javascript: void(0)" onclick="showWaterColumnValueCreateForm('+ groupwatercolumn_id + ',\'' + groupwatercolumn_name + '\',' + watercolumn_id + ',\'' + watercolumn_name + '\')">Create</button>     ' +
		'<button type ="button" class="btn ink-reaction btn-raised btn-info" id="main-request" href="javascript: void(0)" onclick="requestWaterColumnValue('+ groupwatercolumn_id + ',\'' + groupwatercolumn_name + '\',' + watercolumn_id + ',\'' + watercolumn_name + '\')">Request</button>     ';
}

function requestWaterColumnValue(groupwatercolumn_id, groupwatercolumn_name, watercolumn_id, watercolumn_name) {
	$.ajax({
		type: 'POST',
		url: 'http://localhost/ground_water/api/admin/controller/watercolumns.php?',
		data: {
			'action': 'request',
			'id' :  watercolumn_id
		},
		dataType: 'json',
		error: function(data) {
			console.log(data);
		},
		success: function (data) {
			$("#requestwaiting-modal").modal();
			setTimeout(function() {
					$("#requestwaiting-modal").modal('hide');
					loadWaterColumnValueTable(
						groupwatercolumn_id,
						groupwatercolumn_name,
						watercolumn_id,
						watercolumn_name
					); 
				}, 
				60000
			);
		}
	});
}

function showWaterColumnValueCreateForm(groupwatercolumn_id, groupwatercolumn_name, watercolumn_id, watercolumn_name) {
	document.getElementById('formWaterColumnValueModalLabel').innerText = 'CREATE WATER COLUMN VALUE';
	document.getElementById('watercolumnvalue').value = '';
	document.getElementById('watercolumnvaluenote').value = '';
	document.getElementById('watercolumnvaluesubmit').onclick = function() { createWaterColumnValue(groupwatercolumn_id, groupwatercolumn_name, watercolumn_id, watercolumn_name); };
	$("#watercolumnvalue-modal").modal();
}

function createWaterColumnValue(groupwatercolumn_id, groupwatercolumn_name, watercolumn_id, watercolumn_name) {
	var value = document.getElementById('watercolumnvalue').value;
	var note = document.getElementById('groupwatercolumnnote').value;
	var datetime = document.getElementById('groupwatercolumndatetime').value;

	toastr.options.timeOut = 3000; // 3s
	toastr.options.positionClass = "toast-top-center";
	toastr.options.closeButton = true;

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

function showWaterColumnValueEditForm(id, value, note, datetime, groupwatercolumn_id, groupwatercolumn_name, watercolumn_id, watercolumn_name) {
	document.getElementById('formWaterColumnValueModalLabel').innerText = 'EDIT GROUP WATER COLUMN VALUE';
	document.getElementById('watercolumnvalue').value = value;
	document.getElementById('watercolumnvaluenote').value = note;
	document.getElementById('watercolumnvaluedatetime').value = datetime;
	document.getElementById('watercolumnvaluesubmit').onclick = function() { editGroupWaterColumnValue(id, groupwatercolumn_id, groupwatercolumn_name, watercolumn_id, watercolumn_name); };
	$("#watercolumnvalue-modal").modal();
}

function editGroupWaterColumnValue(id, groupwatercolumn_id, groupwatercolumn_name, watercolumn_id, watercolumn_name) {
	var value = document.getElementById('watercolumnvalue').value;
	var note = document.getElementById('watercolumnvaluenote').value;
	var datetime = document.getElementById('watercolumnvaluedatetime').value;

	toastr.options.timeOut = 3000; // 3s
	toastr.options.positionClass = "toast-top-center";
	toastr.options.closeButton = true;

	$("#watercolumnvalue-modal").modal('hide');

	$.ajax({
		type: 'POST',
		url: 'http://localhost/ground_water/api/admin/controller/watercolumnvalues.php?',
		data: {
			'action': 'edit',
			'id' : id,
			'value': value,
			'note' : note,
			'datetime': datetime
		},
		success: function(data) {
			loadWaterColumnValueTable(groupwatercolumn_id, groupwatercolumn_name, watercolumn_id, watercolumn_name);
			toastr.success('Edit success');
		},
		error: function(data) {
			toastr.error('Edit fail');
		}
	});
}

function deleteWaterColumnValue(id, groupwatercolumn_id, groupwatercolumn_name, watercolumn_id, watercolumn_name) {

	toastr.options.timeOut = 3000; // 3s
	toastr.options.positionClass = "toast-top-center";
	toastr.options.closeButton = true;

	$.ajax({
		type: 'POST',
		url: 'http://localhost/ground_water/api/admin/controller/watercolumnvalues.php?',
		data: {
			'action': 'delete',
			'id' : id
		},
		success: function(data) {
			loadWaterColumnValueTable(groupwatercolumn_id, groupwatercolumn_name, watercolumn_id, watercolumn_name);
			toastr.success('Delete success');
		},
		error: function(data) {
			toastr.error('Delete fail');
		}
	});
}

