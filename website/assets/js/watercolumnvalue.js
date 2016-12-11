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
								<th>Date</th>
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
			'<button type="button" class="btn btn-icon-toggle" onclick="showWaterColumnEditForm('+ data[i].id +',\'' + data[i].name +'\',' + data[i].latitude + ',' + data[i].longitude + ',\'' + data[i].note + '\')" data-toggle="tooltip" data-placement="top" data-original-title="Edit"><i class="fa fa-pencil"></i></button>' +
			'<button type="button" class="btn btn-icon-toggle" onclick="deleteWaterColumnValue('+ data[i].id + ')" data-toggle="tooltip" data-placement="top" data-original-title="Delete"><i class="fa fa-trash-o"></i></button>' +
			'</td></tr>';
	}
		
	// close tbody of table
	resultOfTableHTML = resultOfTableHTML + '</tbody>';
	mainTable.innerHTML = resultOfTableHTML;
	mainTitle.innerHTML = watercolumn_name;
	mainTopNavigation.innerHTML = mainTopNavigation.innerHTML +
		'<br>' +
		'<button type ="button" class="btn ink-reaction btn-raised btn-default" id="main-back" href="javascript: void(0)" onclick="loadWaterColumnTable('+ groupwatercolumn_id + ',\'' + groupwatercolumn_name + '\',' + watercolumn_id + ',\'' + watercolumn_name + '\')">Back</button>     ' +
		'<button type ="button" class="btn ink-reaction btn-raised btn-accent" id="main-create" href="javascript: void(0)" onclick="showGroupWaterColumnCreateForm(1)">Create</button>     ' +
		'<button type ="button" class="btn ink-reaction btn-raised btn-info" id="main-request" href="javascript: void(0)" onclick="requestWaterColumnValue('+ watercolumn_id + ')">Request</button>     ';
}

function requestWaterColumnValue(watercolumn_id) {
	$.ajax({
		type: 'POST',
		url: 'http://localhost/ground_water/api/admin/controller/watercolumns.php?action=request',
		data: {
			'id' :  watercolumn_id
		},
		dataType: 'json',
		error: function(data) {
			console.log(data);
		},
		success: function (data) {
			console.log('success');
		}
	});
}

function showWaterColumnValueCreateForm() {
	document.getElementById('formModalLabel').innerText = 'CREATE GROUP WATER COLUMN';
	document.getElementById('groupwatercolumnname').value = '';
	document.getElementById('groupwatercolumnlatitude').value = '';
	document.getElementById('groupwatercolumnlongitude').value = '';
	document.getElementById('groupwatercolumnnote').value = '';
	document.getElementById('groupwatercolumnsubmit').onclick = function() { createGroupWaterColumn(1); };
	$("#groupwatercolumn-modal").modal();
}

function createpWaterColumnValue(area_id) {
	var name = document.getElementById('groupwatercolumnname').value;
	var latitude = document.getElementById('groupwatercolumnlatitude').value;
	var longitude = document.getElementById('groupwatercolumnlongitude').value;
	var note = document.getElementById('groupwatercolumnnote').value;

	toastr.options.timeOut = 3000; // 3s
	toastr.options.positionClass = "toast-top-center";
	toastr.options.closeButton = true;

	$("#groupwatercolumn-modal").modal('hide');

	$.ajax({
		type: 'POST',
		url: 'http://localhost/ground_water/api/admin/controller/groupwatercolumns.php?action=create',
		data: {
			'area_id' : area_id,
			'name': name,
			'latitude': latitude,
			'longitude' : longitude,
			'note' : note
		},
		success: function(data) {
			loadGroupWaterColumnTable();
			toastr.success('Create success');
		},
		error: function(data) {
			toastr.error('Create fail');
		}
	});
}

function showWaterColumnValueEditForm(id, name, latitude, longitude, note) {
	document.getElementById('formModalLabel').innerText = 'EDIT GROUP WATER COLUMN';
	document.getElementById('groupwatercolumnname').value = name;
	document.getElementById('groupwatercolumnlatitude').value = latitude;
	document.getElementById('groupwatercolumnlongitude').value = longitude;
	document.getElementById('groupwatercolumnnote').value = note;
	document.getElementById('groupwatercolumnsubmit').onclick = function() { editGroupWaterColumn(id); };
	$("#groupwatercolumn-modal").modal();
}

function editWaterColumnValue(id) {
	var name = document.getElementById('groupwatercolumnname').value;
	var latitude = document.getElementById('groupwatercolumnlatitude').value;
	var longitude = document.getElementById('groupwatercolumnlongitude').value;
	var note = document.getElementById('groupwatercolumnnote').value;

	toastr.options.timeOut = 3000; // 3s
	toastr.options.positionClass = "toast-top-center";
	toastr.options.closeButton = true;

	$("#groupwatercolumn-modal").modal('hide');

	$.ajax({
		type: 'POST',
		url: 'http://localhost/ground_water/api/admin/controller/groupwatercolumns.php?action=edit',
		data: {
			'id' : id,
			'name': name,
			'latitude': latitude,
			'longitude' : longitude,
			'note' : note
		},
		success: function(data) {
			loadGroupWaterColumnTable();
			toastr.success('Edit success');
		},
		error: function(data) {
			toastr.error('Edit fail');
		}
	});
}

function deleteWaterColumnValue(id) {

	toastr.options.timeOut = 3000; // 3s
	toastr.options.positionClass = "toast-top-center";
	toastr.options.closeButton = true;

	$.ajax({
		type: 'POST',
		url: 'http://localhost/ground_water/api/admin/controller/groupwatercolumns.php?action=delete',
		data: {
			'id' : id
		},
		success: function(data) {
			loadGroupWaterColumnTable();
			toastr.success('Delete success');
		},
		error: function(data) {
			toastr.error('Delete fail');
		}
	});
}

