/** ldj-client-test.js
* @author Edgar Figueroa González - Grado en Ingeniería Informática ULL
*/

'use strict';
const assert = require('assert');
const EventEmitter = require('events').EventEmitter;
const LDJClient = require('../lib/ldj-client.js');

describe('LDJClient', () => {
  let stream = null;
  let client = null;

  beforeEach(() => {
    stream = new EventEmitter();
    client = new LDJClient(stream);
  });

  it('should emit a message event from a single data event', done => {
  	client.on('message', message => {
  	   assert.deepEqual(message, {foo: 'bar'});
  	   done();
  	});
  		stream.emit('data', '{"foo":');
  		process.nextTick(() => stream.emit('data', '"bar"}\n'));
  	});

  it('should emit a message from split data events', done => {
  	client.on('message', message => {
  	   assert.deepEqual(message, {foo: 'bar' });
  	   done();
  	});
  		 stream.emit('data', '{"foo');
  		 process.nextTick(() => stream.emit('data', '": "bar"}'));
  		 process.nextTick(() => stream.emit('data', '\n'));
  });

  it('null to LDJClient constructor', done => {
  	assert.throws(() => {
  	   new LDJClient(null);
  	});
  		 done();
  });

  it('should emit a data event that is not JSON', done => {
    assert.throws(() => {
      stream.emit('data', '{"foo\n');
    });
      done();
  });

  it('should show messages without newline followed by a close event', done => {
		client.on('message', message => {
			assert.deepEqual(message, {foo: 'bar' });
			done();
		});
		  stream.emit('data', '{"foo": "bar"}');
		  stream.emit('close');
  });
});
