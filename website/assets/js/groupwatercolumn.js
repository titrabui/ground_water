$(document).ready(function(){
	loadGroupWaterColumnTable();
});

function loadGroupWaterColumnTable() {
	$.ajax({
		type: 'GET',
		url: 'http://localhost/ground_water/api/admin/controller/groupwatercolumns.php?',
		data: {
			'action' : 'get_by_areaid',
			'id' :  1
		},
		dataType: 'json',
		error: function(data) {
			console.log(data);
		},
		success: function (data) {
			parseDataToGroupWaterColumnTable(data.message);
		}
	});
}

function parseDataToGroupWaterColumnTable(data) {
	var mainTable = document.getElementById('main-table');
	var mainTitle = document.getElementById('main-title');
	var resultOfTableHTML = '';

	// init table HTML
	resultOfTableHTML = `<thead>
							<tr>
								<th>No</th>
								<th>Area Name</th>
								<th>Group Water Name</th>
								<th>Latitude</th>
								<th>Longitude</th>
								<th>Note</th>
								<th class="text-right"></th>
							</tr>
						</thead>
						<tbody>`;

	for (var i = 0; i < data.length; i++) {
		resultOfTableHTML = resultOfTableHTML +
			'<tr>' +
			'<td>' + (i + 1) +'</td>' +
			'<td>Hồ Hòa Trung</td>' +
			'<td>' + data[i].name +'</td>' +
			'<td>' + data[i].latitude +'</td>' +
			'<td>' + data[i].longitude +'</td>' +
			'<td>' + data[i].note +'</td>' +
			'<td class="text-right">' +
			'<button type="button" class="btn btn-icon-toggle" data-toggle="tooltip" data-placement="top" data-original-title="View Details"><i class="fa fa-eye"></i></button>' +
			'<button type="button" class="btn btn-icon-toggle" data-toggle="tooltip" data-placement="top" data-original-title="Edit"><i class="fa fa-pencil"></i></button>' +
			'<button type="button" class="btn btn-icon-toggle" data-toggle="tooltip" data-placement="top" data-original-title="Delete"><i class="fa fa-trash-o"></i></button>' +
			'</td></tr>';
	}
		
	// close tbody of table
	resultOfTableHTML = resultOfTableHTML + '</tbody>';
	mainTable.innerHTML = resultOfTableHTML;
	mainTitle.innerHTML = 'GROUP WATER VALUES';
}

function showGroupWaterColumnCreateForm() {
	$("#groupwatercolumn-modal").modal();
}

function createGroupWaterColumn(area_id) {
	var name = document.getElementById('groupwatercolumnname').value;
	var latitude = document.getElementById('groupwatercolumnlatitude').value;
	var longitude = document.getElementById('groupwatercolumnlongitude').value;
	var note = document.getElementById('groupwatercolumnnote').value;
	toastr.options.timeOut = 3000; // 3s
	toastr.options.positionClass = "toast-top-center"; // 3s

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
			toastr.success('Create success');
		},
		error: function(data) {
			toastr.error('Create fail');
		}
	});

	loadGroupWaterColumnTable();
}
