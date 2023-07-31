/* eslint-disable new-cap */
import {Entity, PrimaryGeneratedColumn, Column, Index} from 'typeorm';

@Entity({name: 'jobs'})
export class Job {
	@PrimaryGeneratedColumn()
		id: bigint;

	@Column({length: 255})
	@Index()
		queue: string;

	@Column('text')
		payload: string;

	@Column('int', {unsigned: true})
		attempts: number;

	@Column('int', {nullable: true, unsigned: true, name: 'reserved_at'})
		reservedAt: number | undefined;

	@Column('int', {unsigned: true, name: 'available_at'})
		availableAt: number;

	@Column('int', {unsigned: true, name: 'created_at'})
		createdAt: number;
}
