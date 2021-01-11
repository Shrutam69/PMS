using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ProjectManagementWebApiCore.Models
{
    public partial class ProjectManagementContext : DbContext
    {
        public ProjectManagementContext()
        {
        }

        public ProjectManagementContext(DbContextOptions<ProjectManagementContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblAssign> TblAssign { get; set; }
        public virtual DbSet<TblEmployee> TblEmployee { get; set; }
        public virtual DbSet<TblEmployeeSkill> TblEmployeeSkill { get; set; }
        public virtual DbSet<TblProject> TblProject { get; set; }
        public virtual DbSet<TblProjectTech> TblProjectTech { get; set; }
        public virtual DbSet<TblSkillsMaster> TblSkillsMaster { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=PCA196\\SQL2014;Database=ProjectManagement;User ID=sa;Password=shrutatva123");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TblAssign>(entity =>
            {
                entity.ToTable("tblAssign");
            });

            modelBuilder.Entity<TblEmployee>(entity =>
            {
                entity.ToTable("tblEmployee");

                entity.HasIndex(e => e.Code)
                    .HasName("UQ__tblEmplo__A25C5AA7F5C93DEE")
                    .IsUnique();

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(25);

                entity.Property(e => e.ReleaseDate).HasColumnType("date");

                entity.Property(e => e.StartDate).HasColumnType("date");
            });

            modelBuilder.Entity<TblEmployeeSkill>(entity =>
            {
                entity.ToTable("tblEmployeeSkill");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.TblEmployeeSkill)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK__tblEmploy__Emplo__59FA5E80");

                entity.HasOne(d => d.Skill)
                    .WithMany(p => p.TblEmployeeSkill)
                    .HasForeignKey(d => d.SkillId)
                    .HasConstraintName("FK__tblEmploy__Skill__5AEE82B9");
            });

            modelBuilder.Entity<TblProject>(entity =>
            {
                entity.ToTable("tblProject");

                entity.HasIndex(e => e.Code)
                    .HasName("UQ__tblProje__A25C5AA78CC68835")
                    .IsUnique();

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(25);

                entity.Property(e => e.StartDate).HasColumnType("date");
            });

            modelBuilder.Entity<TblProjectTech>(entity =>
            {
                entity.ToTable("tblProjectTech");

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.TblProjectTech)
                    .HasForeignKey(d => d.ProjectId)
                    .HasConstraintName("FK__tblProjec__Proje__5CD6CB2B");

                entity.HasOne(d => d.Skill)
                    .WithMany(p => p.TblProjectTech)
                    .HasForeignKey(d => d.SkillId)
                    .HasConstraintName("FK__tblProjec__Skill__5DCAEF64");
            });

            modelBuilder.Entity<TblSkillsMaster>(entity =>
            {
                entity.ToTable("tblSkillsMaster");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
