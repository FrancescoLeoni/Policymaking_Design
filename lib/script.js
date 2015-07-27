var svgWidth = 750,
    svgHeight = 750,
    width = 450,
    height = 450,

    svg = d3.select('#mainContainer')
        .append('svg')
        .attr({
            'width': svgWidth,
            'height': svgHeight,
        }),

    rotateGroup = svg.append('g')/*.attr('transform', 'translate(-175, 375) rotate(-45)')*/,

    textureOne = textures.lines()
        .strokeWidth(0.5);

    textureTwo = textures.lines()
        .orientation("vertical")
        .strokeWidth(0.5),

    textureThree = textures.circles()
        .lighter(),

    texturesFour = textures.circles()
        .radius(3)
        .fill("transparent")
        .strokeWidth(0.5);

svg.call(textureOne);
svg.call(textureTwo);
svg.call(textureThree);
svg.call(texturesFour);

// rettangolo principale
rotateGroup.append('rect')
    .attr({
        'x': (svgWidth - width)/2,
        'y': (svgHeight - height)/2,
        'width': width,
        'height': height,
        'fill': 'none',
        'stroke': 'black',
        'stroke-width': 2
    });

// linee che dividono i quadrati

// linea verticale
rotateGroup.append('line')
    .attr({
        'x1': svgWidth/2,
        'y1': (svgHeight - height) / 2 - 50,
        'x2': svgWidth / 2,
        'y2': ((svgHeight - height) / 2 + height) + 50,
        'stroke': 'black',
        'stroke-width': 2
    });

// linea orizzontale
rotateGroup.append('line')
    .attr({
        'x1': (svgHeight - height) / 2 - 50,
        'y1': svgWidth/2,
        'x2': ((svgHeight - height) / 2 + height) + 50,
        'y2': svgWidth / 2,
        'stroke': 'black',
        'stroke-width': 2
    });

// i 4 rettangoli interni

// array che mi serve ad avere 4 elementi da cui generare i 4 quadrati
var rectFill = [textureOne, textureTwo, textureThree, texturesFour];

rotateGroup.append('g')
    .selectAll('rect')
    .data(rectFill)
    .enter()
    .append('rect')
    .attr({
        'width': width / 2,
        'height': height / 2,
        'x': function (d, i) {
            if (i === 1 || i === 3) {
                return ((svgWidth - width) / 2 + width / 2)
            }
            else if (i === 0 || i === 2) {
                return ((svgWidth - width) / 2)
            }
        },
    'y': function (d, i) {
            if (i === 0 || i === 1) {
                return ((svgHeight - height) / 2)
            }
            else if (i === 2 || i === 3) {
                return ((svgHeight - height) / 2 + height / 2)
            }
        },
    'id': function (d) { return d; }
    })
    .style('fill', function (d,i) {
        return rectFill[i].url()
    });

// creazione label quadrati

// Pubblica amministrazione
rotateGroup.append('text')
    .attr({
        'x': (svgWidth - width) / 2,
        'y': ((svgHeight - height) / 2) - 10,
        'font-family': 'sans-serif',
        'font-weight': 'bold',
        'text-anchor': 'start'
    })
    .text('Public Sector');

// Terzo settore
rotateGroup.append('text')
    .attr({
        'x': (svgWidth - width) / 2 + width,
        'y': ((svgHeight - height) / 2) - 10,
        'font-family': 'sans-serif',
        'font-weight': 'bold',
        'text-anchor': 'end'
    })
    .text('Third Sector');

// Ricerca e università
rotateGroup.append('text')
    .attr({
        'x': (svgWidth - width) / 2,
        'y': ((svgHeight - height) / 2) + height + 25,
        'font-family': 'sans-serif',
        'font-weight': 'bold',
        'text-anchor': 'start'
    })
    .text('University and research center');

// Impresa privata
rotateGroup.append('text')
    .attr({
        'x': (svgWidth - width) / 2 + width,
        'y': ((svgHeight - height) / 2) + height + 25,
        'font-family': 'sans-serif',
        'font-weight': 'bold',
        'text-anchor': 'end'
    })
    .text('Private companies');

//
// Creazione cerchi
//

var circleArray = [
        {
            'name': 'Mindlab',
            'category': 'Pubblica amministrazione'
        },
        {
            'name': 'The Policy Lab',
            'category': 'Pubblica amministrazione'
        },
        {
            'name': 'Culo',
            'category': 'Pubblica amministrazione'
        },
        {
            'name': 'Culo',
            'category': 'Pubblica amministrazione'
        },
        {
            'name': 'Culo',
            'category': 'Pubblica amministrazione'
        },
        {
            'name': 'Culo',
            'category': 'Pubblica amministrazione'
        },
        {
            'name': 'Silk Innovation Lab',
            'category': 'Pubblica amministrazione'
        },
        {
            'name': 'Parsons School of Design',
            'category': 'Ricerca università'
        },
        {
            'name': 'IDEO',
            'category': 'Impresa privata'
        },
        {
            'name': 'Helsinki Design Lab',
            'category': 'Terzo Settore'
        },
        {
            'name': 'The Public Policy Lab',
            'category': 'Impresa privata'
        },
        {
            'name': 'Shift Design',
            'category': 'Terzo Settore'
        },
        {
            'name': 'La 27éme Region',
            'category': 'Terzo Settore'
        }
    ];

rotateGroup.append('g')
    .selectAll('circle')
    .data(circleArray)
    .enter()
    .append('circle')
    .attr({
        'id': function (d) { return d.name; },
        'class': function (d) { return d.category.replace(' ', '_'); }
    })
    .on('click', function (d){
        d3.select("#nome-scheda").selectAll('p').remove();
        d3.select("#nome-scheda").append('p').append('text').text(d.name);
    })


rotateGroup.selectAll('.Pubblica_amministrazione')
    .attr({
        'cx': function (d, i) { return (svgWidth - width) /2 + ((svgWidth - width) /3 * i) + 10; },
        'cy': function (d, i) { return (svgHeight - height) /2 + ((svgHeight - height) /3 * i) + 10; },
        'r': 4
    });

rotateGroup.selectAll('.Terzo_Settore')
    .attr({
        'cx': function (d,i) {
            if (i === 0 || i === 2) { return ((svgWidth - width) /2) + (width / 2) + 10; }
            else if (i === 1 || i === 3) { return ((svgWidth - width) /2) + width - 10; }
        },
        'cy': function (d,i) {
            if (i === 0 || i === 1) { return ((svgWidth - width) /2)  + 10; }
            else if (i === 2 || i === 3) { return ((svgWidth - width) /2) + width/2 - 10; }
        },
        'r': 4
    });

rotateGroup.selectAll('.Ricerca_università')
    .attr({
        'cx': (svgWidth - width) / 2 + width / 4,
        'cy': (svgHeight - height) / 2 + height * 0.75,
        'r': 4
    });

rotateGroup.selectAll('.Impresa_privata')
    .attr({
        'cx': (svgWidth - width) / 2 + width * 0.75,
        'cy': (svgHeight - height) / 2 + height * 0.75,
        'r': 4
    });
