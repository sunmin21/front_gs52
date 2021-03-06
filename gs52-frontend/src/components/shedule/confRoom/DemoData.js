
var DemoData = {
    resources: [{
        id: 'r0',
        name: 'Resource0',
        groupOnly: true
    }, {
        id: 'r1',
        name: 'Resource1',
        parentId: 'r0'
    }, {
        id: 'r2',
        name: 'Resource2',
        parentId: 'r3'
    }, {
        id: 'r3',
        name: 'Resource3',
        parentId: 'r1'
    }, {
        id: 'r4',
        name: 'Resource4'
    }, {
        id: 'r5',
        name: 'Resource5'
    }, {
        id: 'r6',
        name: 'Resource6'
    }, {
        id: 'r7',
        name: 'Resource7Resource7Resource7Resource7Resource7'
    }],




    events: [{
        id: 1,
        start: '2017-12-18 09:30:00',
        end: '2017-12-19 23:30:00',
        resourceId: 'r1',
        title: 'I am finished',
        bgColor: '#D9D9D9',
        showPopover: false
    }, {
        id: 2,
        start: '2017-12-18 12:30:00',
        end: '2017-12-26 23:30:00',
        resourceId: 'r2',
        title: 'I am not resizable',
        showPopover: false,
        resizable: false
    }, {
        id: 3,
        start: '2017-12-19 12:30:00',
        end: '2017-12-20 23:30:00',
        resourceId: 'r3',
        title: 'I am not movable',
        showPopover: false,
        movable: false
    }],





    eventsForTaskView: [{
        id: 1,
        start: '2017-12-18 09:30:00',
        end: '2017-12-18 23:30:00',
        resourceId: 'r1',
        title: 'I am finished',
        bgColor: '#D9D9D9',
        groupId: 1,
        groupName: 'Task1'
    }, {
        id: 2,
        start: '2017-12-18 12:30:00',
        end: '2017-12-26 23:30:00',
        resourceId: 'r2',
        title: 'I am not resizable',
        resizable: false,
        groupId: 1,
        groupName: 'Task2'
    }, {
        id: 3,
        start: '2017-12-19 12:30:00',
        end: '2017-12-20 23:30:00',
        resourceId: 'r3',
        title: 'I am not movable',
        movable: false,
        groupId: 3,
        groupName: 'Task3'
    }],





    eventsForCustomEventStyle: [{
        id: 1,
        start: '2017-12-18 09:30:00',
        end: '2017-12-19 23:30:00',
        resourceId: 'r1',
        title: 'I am finished',
        bgColor: '#D9D9D9',
        type: 1 //nonono
    }, {
        id: 2,
        start: '2017-12-18 12:30:00',
        end: '2017-12-26 23:30:00',
        resourceId: 'r2',
        title: 'I am not resizable',
        resizable: false,
        type: 2
    }, {
        id: 3,
        start: '2017-12-19 12:30:00',
        end: '2017-12-20 23:30:00',
        resourceId: 'r3',
        title: 'I am not movable',
        movable: false,
        type: 3
    }]
};

exports.default = DemoData;