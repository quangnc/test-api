import { Column, Entity, ManyToOne, Index, JoinColumn } from 'typeorm';

import { ApkVersion } from './apk-version.entity';
import { AutoIdEntity } from 'src/common/base-entity';

@Entity('apk_version_infos')
@Index(['versionId', 'locale'], { unique: true })
export class ApkVersionInfo extends AutoIdEntity {
    @Column()
    public versionId: number;

    @Column()
    public locale: string;

    @Column()
    public note: string;

    @ManyToOne(() => ApkVersion, (v) => v.devNotes)
    @JoinColumn({name: "versionId"})
    public version: ApkVersion;

}